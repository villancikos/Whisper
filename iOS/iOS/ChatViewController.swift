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
    var fromName = ""
    var toID = ""
    var receiver = ""
    var messagesList = [messageStruct] ()
    var conversationId = UUID().uuidString
    var conversationList = [String] ()

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
        fetchMessages()
        // Do any additional setup after loading the view.
    }
    
    
    func retrieveConversationId(){
        
        // fetch conversations ID from Whisper Database
        let databaseRef = FIRDatabase.database().reference()
        databaseRef.child("users").child(userID!).child("conversations").observe(.childAdded, with: { (snapshot) in
            let userConversationId: String? = snapshot.value as? String
            self.conversationList.insert(userConversationId!, at: 0)
            self.conversationList[0] = "I'm here"
            print(self.conversationList[0])
        })
    
    }
    
    
    func fetchMessages(){
        
        // fetch chat log from Whisper Database
        let databaseRef = FIRDatabase.database().reference()
        databaseRef.child("message").queryOrderedByKey().observe(.childAdded, with: { (snapshot) in
            let snapshotValue = snapshot.value as? NSDictionary
            let fromID = snapshotValue?["sender"] as? String
            let text = snapshotValue?["content"] as? String
            let toID = snapshotValue?["receiver"] as? String
            self.messagesList.insert(messageStruct(fromID: fromID, toID: toID, text: text), at: 0)
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
            FIRDatabase.database().reference().child("messages").child(conversationId).childByAutoId().setValue(newMessage)
            // send conversation info to database child "conversations"
            let conversationInfo = ["last_message" : message, "timestamp" : timeStamp] as [String : Any]
            FIRDatabase.database().reference().child("conversations").child(conversationId).setValue(conversationInfo)
            // send conversation info to database child "participants"
            let participantsInfo = [userID! : true, receiver : true] as [String : Any]
            FIRDatabase.database().reference().child("participants").child(conversationId).setValue(participantsInfo)
            // send conversation info to database child "users"
            let userConversations = [conversationId : true]
            FIRDatabase.database().reference().child("users").child(userID!).child("conversations").updateChildValues(userConversations)
            FIRDatabase.database().reference().child("users").child(receiver).child("conversations").updateChildValues(userConversations)
        }
        textField.text = ""
    }
    
    func getUserInfo(){
        FIRDatabase.database().reference().child("users").child(userID!).observeSingleEvent(of:.value, with: { (snapshot) in
            if let dic = snapshot.value as? [String : AnyObject] {
                self.fromName = (dic["name"] as? String)!
            }
        })
    }
    
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return messagesList.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = messageTable.dequeueReusableCell(withIdentifier: "messageCell", for: indexPath)
        let fromID = messagesList[indexPath.row].fromID
        
        FIRDatabase.database().reference().child("users").child(fromID!).observeSingleEvent(of:.value, with: { (snapshot) in
            let snapshotValue = snapshot.value as? NSDictionary
            cell.textLabel?.text = (snapshotValue?["name"] as? String)!
        })
        cell.detailTextLabel?.text = messagesList[indexPath.row].text
        return cell
    }

}
