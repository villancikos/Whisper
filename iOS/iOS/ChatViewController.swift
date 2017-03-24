//
//  ChatViewController.swift
//  iOS
//
//  Created by Khaled AlObaid on 3/23/17.
//  Copyright © 2017 TripleAteam. All rights reserved.
//

import UIKit
import Firebase

class ChatViewController: UIViewController, UITableViewDataSource, UITableViewDelegate{
    
    let userID = FIRAuth.auth()?.currentUser?.uid
    var toID = ""
    var receiver = ""
    var messagesList = [messageStruct] ()
    var conversationIdToSendAndFetch = ""
    var conversationList = [String]()
    var receiverConversationList = [String]()

    
    @IBOutlet weak var textField: UITextField!
    @IBOutlet weak var messageTable: UITableView!

    @IBAction func didClickBack(_ sender: Any) {
        dismiss(animated: false)
    }
    

    @IBAction func didClickSend(_ sender: Any) {
        sendMessage()
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
//        retrieveConversationId()
        
// code below is for testing only, will be remove when retrieveConversationId fixed
        conversationList = ["13D0D35A-48A9-4204-899D-2AC2FE78C0B1", "4EDE8E2C-9BF8-48DB-83FC-88E033E6460B", "6373B67D-F3A6-4438-9844-B04198110612", "CC17F938-238E-4D38-9DE3-88E2F2693400"]
        receiverConversationList = ["13D0D35A-48A9-4204-899D-2AC2FE78C0B1"]
// end of  testing
        
        checkIfTheyChatBefore()
        print(conversationIdToSendAndFetch)
        fetchMessages()
        // Do any additional setup after loading the view.
    }
    
    
    func retrieveConversationId(){
        // fetch conversations ID from Whisper Database
        FIRDatabase.database().reference().child("users").child(userID!).child("conversations").observeSingleEvent(of:.value, with: { (snapshot) in
            let snapshotValue = snapshot.value as? NSDictionary
            print(snapshotValue?.allKeys as! String)
            // snapshotValue?.allKeys return list of ids
        })
        
        dump(conversationList)
    }
    
    
    func fetchMessages(){
        
        // fetch chat log from Whisper Database
        FIRDatabase.database().reference().child("messages").child(conversationIdToSendAndFetch).queryOrderedByKey().observe(.childAdded, with: { (snapshot) in
            let snapshotValue = snapshot.value as? NSDictionary
            let sender = snapshotValue?["sender"] as? String
            let receiver = snapshotValue?["receiver"] as? String
            let content = snapshotValue?["content"] as? String
            let timestamp = snapshotValue?["timestamp"] as? String
            self.messagesList.insert(messageStruct(sender: sender, receiver: receiver, content: content, typeOfContent : "text", timestamp : timestamp), at: 0)
            self.messageTable.reloadData()
        })
        
    
    }
    
    
    func checkIfTheyChatBefore(){
        
        
        // "default" is that they didn't chat before, assign new id to start new chat
        conversationIdToSendAndFetch = UUID().uuidString
    
        let numberOfConversations = conversationList.count
        var i = 0
        while i < numberOfConversations {
            
            if(checkIfConversationIdIsExistInReciverConversationList(conversationId: conversationList[i])){
            // they chat before, update conversationIdToSendAndFetch
                conversationIdToSendAndFetch = conversationList[i]
                i = numberOfConversations
                print("I'm here")
            }
            i = i + 1
            
        }

    
    }
        // this func should be updated to chech reciver->conversation list and return true if he/she already chat with sender
    func checkIfConversationIdIsExistInReciverConversationList(conversationId : String) -> Bool{
    
        var conversationIdExisted = false
        
        /*
        FIRDatabase.database().reference().child("participants").child("\(conversationId)").observe(.value, with: { (snapshot) in
            
            // I have the same issue here. I need to get a list of id in string without NSDictionry structrue
            
        })
        */
        
        let numberOfReceiverConversations = receiverConversationList.count
        var i = 0
        while i < numberOfReceiverConversations {
            
            if (receiverConversationList[i]==conversationId){
                conversationIdExisted = true
                i = numberOfReceiverConversations
            }
            i = i + 1
        }
        
        return conversationIdExisted
    }
    
    func sendMessage(){
        if (textField.text!.isEmpty){
            // text field is empty, do nothing
        }else{
            // send message to database child "messages"
            let message = self.textField.text
            let timeStamp = self.timeStamp()
            let newMessage = ["sender" : userID,  "receiver" : receiver, "content" : message, "typeOfContent" : "text", "timestamp" : timeStamp] as [String : Any]
            FIRDatabase.database().reference().child("messages").child(conversationIdToSendAndFetch).childByAutoId().setValue(newMessage)
            // send conversation info to database child "conversations"
            let conversationInfo = ["last_message" : message, "timestamp" : timeStamp] as [String : Any]
            FIRDatabase.database().reference().child("conversations").child(conversationIdToSendAndFetch).setValue(conversationInfo)
            // send conversation info to database child "participants"
            let participantsInfo = [userID! : true, receiver : true] as [String : Any]
            FIRDatabase.database().reference().child("participants").child(conversationIdToSendAndFetch).setValue(participantsInfo)
            // send conversation info to database child "users"
            let userConversations = [conversationIdToSendAndFetch : true]
            FIRDatabase.database().reference().child("users").child(userID!).child("conversations").updateChildValues(userConversations)
            FIRDatabase.database().reference().child("users").child(receiver).child("conversations").updateChildValues(userConversations)
        }
        textField.text = ""
    }
    
    
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return messagesList.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = messageTable.dequeueReusableCell(withIdentifier: "messageCell", for: indexPath)
        let fromID = messagesList[indexPath.row].sender
        
        FIRDatabase.database().reference().child("users").child(fromID!).observeSingleEvent(of:.value, with: { (snapshot) in
            let snapshotValue = snapshot.value as? NSDictionary
            cell.textLabel?.text = (snapshotValue?["name"] as? String)!
        })
        cell.detailTextLabel?.text = messagesList[indexPath.row].content
        return cell
    }

}
