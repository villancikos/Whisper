//
//  AllUsersViewController.swift
//  iOS
//
//  Created by Khaled AlObaid on 3/22/17.
//  Copyright © 2017 TripleAteam. All rights reserved.
//

import UIKit
import Firebase


class AllUsersViewController: UIViewController, UITableViewDataSource, UITableViewDelegate{
    
    var userList = [users]()
    var conversationList = [conversation]()
    var receiver = ""
    
    
    
    @IBOutlet weak var navBarTitle: UINavigationItem!
    @IBOutlet weak var userListTable: UITableView!
    @IBAction func didClickBack(_ sender: Any) {
        // sign out code from Firebase doc
        let firebaseAuth = FIRAuth.auth()
        do {
            try firebaseAuth?.signOut()
        } catch let signOutError as NSError {
            print ("Error signing out: %@", signOutError)
        }
        // return to sign in UI
        self.performSegue(withIdentifier: "signIn", sender: self)
    }

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        fetchAllUsers()
        updateNavTitle()
        // update last seen into DB
        let ref = FIRDatabase.database().reference()
        let currentUserId = FIRAuth.auth()?.currentUser?.uid
        let info = ["lastSeen" : self.timeStamp()]
        print(self.timeStamp())
        ref.child("users").child(currentUserId!).updateChildValues(info)
    }
    
    func updateNavTitle(){
        let userID = FIRAuth.auth()?.currentUser?.uid
        FIRDatabase.database().reference().child("users").child(userID!).observeSingleEvent(of: .value, with: { (snapshot) in
            let snapshotValue = snapshot.value as? NSDictionary
            let uName = snapshotValue?["name"] as? String ?? "Whisper user"
            self.navBarTitle.title = "Welcome " + uName
        })
    
    
    }
    
    func fetchAllUsers(){
        // fetch all users from Whisper Database
        let dataBaseRef = FIRDatabase.database().reference()
        
        dataBaseRef.child("users").queryOrderedByKey().observe(.childAdded , with: { (snapshot) in
            let snapshotValue = snapshot.value as? NSDictionary
            let userID = snapshot.key as? String
            let uName = snapshotValue?["name"] as? String
            let UImageUrl = snapshotValue?["image"] as? String
            let UEmail = snapshotValue?["email"] as? String
            let lastSeen = snapshotValue?["lastSeen"] as? Int ?? 1490741717111
            self.userList.insert(users(userId: userID, name: uName, imageUrl: UImageUrl, email: UEmail,  timeStamp: lastSeen), at: 0)
            
            self.fetchLastMessageAndTimeStamp(userIdToFetchLastMessage : userID!)
            self.userListTable.reloadData()
        })
    }
    
    
    // this function should return data from child "conversation" in database as a string
    func fetchLastMessageAndTimeStamp(userIdToFetchLastMessage : String) -> [String]{
        
        return ["test"]
    
    }
    
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return userList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = userListTable.dequeueReusableCell(withIdentifier: "userCell", for: indexPath)
        cell.textLabel?.text = userList[indexPath.row].name
        
        // check timestamp and print last seen time and date **
        let todayTime : TimeInterval = Double(self.timeStamp())
        let today = Date.init(timeIntervalSince1970: todayTime/1000)
        let timeStamp : TimeInterval = Double(userList[indexPath.row].timeStamp)
        let readableTime = Date.init(timeIntervalSince1970: timeStamp/1000)
        let dateFormat = DateFormatter()
        let todayDateFormat = DateFormatter()
        todayDateFormat.dateStyle = .short
        dateFormat.dateStyle = .short
        
        let lastSeenDate = dateFormat.string(from: readableTime)
        let todayDate = dateFormat.string(from: today)

        if (lastSeenDate==todayDate){
            let timeStampToPrint : TimeInterval = Double(userList[indexPath.row].timeStamp)
            let readableTimeToPrint = Date.init(timeIntervalSince1970: timeStampToPrint/1000)
            let dateFormatToPrint = DateFormatter()
            dateFormatToPrint.timeZone = TimeZone.current
            dateFormatToPrint.timeStyle = .short
            let printDateAndTime = dateFormatToPrint.string(from: readableTimeToPrint)
            cell.detailTextLabel?.text = "Last seen Today at " + printDateAndTime

            
        }else{
            dateFormat.timeZone = TimeZone.current
            dateFormat.timeStyle = .short
            let lastSeenDate = dateFormat.string(from: readableTime)
            cell.detailTextLabel?.text = "Last seen was " + lastSeenDate
        }
        // ** end of time and date print
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        receiver = userList[indexPath.row].userId
        performSegue(withIdentifier: "chat", sender: nil)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if (segue.identifier == "chat") {
            let dest = segue.destination as? ChatViewController
            dest?.receiver = self.receiver
        }
    }
    
}
