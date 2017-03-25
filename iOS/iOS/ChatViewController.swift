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
    var conversationIdToSendAndFetch = UUID().uuidString
    var conversationList = [String]()
    var receiverConversationList = [String]()
    
    
    @IBOutlet weak var textField: UITextField!
    @IBOutlet weak var messageTable: UITableView!

    @IBAction func didClickBack(_ sender: Any) {
//        conversationList.removeAll()
//        receiverConversationList.removeAll()
        dismiss(animated: false)
    }
    

    @IBAction func didClickSend(_ sender: Any) {
        sendMessage()
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
//        retrieveConversationId()
//        retrieveReceiverConversationList()
//        checkIfTheyChatBefore()
//        print(conversationIdToSendAndFetch)
//        fetchMessages()
        rId()
        self.hideKeyboardWhenTappedAround()
        // Do any additional setup after loading the view.
    }
    
    
    
    func rId(){
        // fetch conversations ID for sender
        let ref =  FIRDatabase.database().reference().child("users").child(userID!)
        ref.observeSingleEvent(of:.value, with: { (snapshot) in
            if snapshot.hasChild("conversations"){
                
                ref.child("conversations").observeSingleEvent(of: .value, with: { (snapshot) in
                    // Get sender conversations IDs
                    let snapshotValue = snapshot.value as? NSDictionary
                    self.conversationList = snapshotValue?.allKeys as! [String]
                    var i = 0
                    let numberOfConversations = self.conversationList.count
                    for i in 0..<numberOfConversations {

                        // fetch conversations ID for reciver
                        let reff =  FIRDatabase.database().reference().child("users").child(self.receiver)
                        reff.observeSingleEvent(of:.value, with: { (snapshot) in
                            if snapshot.hasChild("conversations"){
                                
                                reff.child("conversations").observeSingleEvent(of: .value, with: { (snapshot) in
                                    // Get retrieve conversations IDs
                                    let snapshotValue = snapshot.value as? NSDictionary
                                    self.receiverConversationList = snapshotValue?.allKeys as! [String]
                                    let numberOfReceiverConversations = self.receiverConversationList.count
                                    for j in 0..<numberOfReceiverConversations{
                                        if (self.receiverConversationList[j]==self.conversationList[i]){
                                            self.fM(id : self.receiverConversationList[j])
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    
    
    
    func fM(id : String){
        conversationIdToSendAndFetch = id
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
    
    
    
    func retrieveConversationId(){
        // fetch conversations ID for sender
        let ref =  FIRDatabase.database().reference().child("users").child(userID!)
        ref.observeSingleEvent(of:.value, with: { (snapshot) in
            if snapshot.hasChild("conversations"){
                
                ref.child("conversations").observeSingleEvent(of: .value, with: { (snapshot) in
                    // Get sender conversations IDs
                    let snapshotValue = snapshot.value as? NSDictionary
                    self.conversationList = snapshotValue?.allKeys as! [String]
//                    self.saveList(sList: self.conversationList)
                })
            }
        })
    }
    
    
    func retrieveReceiverConversationList(){
        // fetch conversations ID for reciver
        let ref =  FIRDatabase.database().reference().child("users").child(receiver)
        ref.observeSingleEvent(of:.value, with: { (snapshot) in
            if snapshot.hasChild("conversations"){
                
                ref.child("conversations").observeSingleEvent(of: .value, with: { (snapshot) in
                    // Get retrieve conversations IDs
                    let snapshotValue = snapshot.value as? NSDictionary
                    self.receiverConversationList = snapshotValue?.allKeys as! [String]
                })
            }
        })
    }
    
    
    func saveList(sList : [String]){
        self.conversationList = sList
    }
    
    
    func checkIfTheyChatBefore(){
        // We assume that the "default" is they didn't chat before, so assign new id to start new chat
        
        print("111111")
        conversationIdToSendAndFetch = UUID().uuidString
        
        let numberOfConversations = self.conversationList.count
        print("22222")
        print(numberOfConversations)
        for i in 0..<numberOfConversations {
            print(i)
            print("33333")
            if((checkIfConversationIdIsExistInReciverConversationList(conversationIdToCompare: conversationList[i]))==true){
                // if they chat before, update conversationIdToSendAndFetch
                self.conversationIdToSendAndFetch = conversationList[i]
            }
            
        }
        
        print("44444")

        
//        var i = 0
//        while i < numberOfConversations {
//            print("I'm here, 111",conversationIdToSendAndFetch,receiverConversationList[i])
//
//            if((checkIfConversationIdIsExistInReciverConversationList(conversationIdToCompare: conversationList[i]))==true){
//                // if they chat before, update conversationIdToSendAndFetch
//                self.conversationIdToSendAndFetch = conversationList[i]
//                i = numberOfConversations
//                print("I'm here, 222",conversationIdToSendAndFetch,conversationList[i])
//            }
//            i = i + 1
//        }
    }

    
    func checkIfConversationIdIsExistInReciverConversationList(conversationIdToCompare : String) -> Bool{
        print("555555")

        var conversationIdExisted = false
        let numberOfReceiverConversations = receiverConversationList.count

        
        for i in 0..<numberOfReceiverConversations{
            print(i)
            if (receiverConversationList[i]==conversationIdToCompare){
            conversationIdExisted = true
                print("666666")

            }
        }
        
//        
//        var i = 0
//        while i < numberOfReceiverConversations {
//            
//            if (receiverConversationList[i]==conversationIdToCompare){
//                conversationIdExisted = true
//                i = numberOfReceiverConversations
//            }
//            i = i + 1
//        }
        
        print("77777")

        return conversationIdExisted
    }

    
    
    func fetchMessages(){
        print(conversationIdToSendAndFetch)
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
