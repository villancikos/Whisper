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
    var receiver = ""
    
    
    
    @IBOutlet weak var userListTable: UITableView!
    @IBAction func didClickBack(_ sender: Any) {
        dismiss(animated: true)
    }

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        fetchAllUsers()
        // Do any additional setup after loading the view.
    }
    
    
    
    func fetchAllUsers(){
        // fetch all users from Whisper Database
        let dataBaseRef = FIRDatabase.database().reference()
        
        dataBaseRef.child("users").queryOrderedByKey().observe(.childAdded , with: { (snapshot) in
            let snapshotValue = snapshot.value as? NSDictionary
            let userID = snapshot.key as? String
            let uName = snapshotValue?["name"] as? String
            print(uName)
            let UImageUrl = snapshotValue?["image"] as? String
            let UEmail = snapshotValue?["email"] as? String
            let lastSeen = self.currentTimeStamp()
            self.userList.insert(users(userId: userID, name: uName, imageUrl: UImageUrl, email: UEmail,  timeStamp: lastSeen), at: 0)
            self.userListTable.reloadData()
        })
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
        cell.detailTextLabel?.text = "last seen " + userList[indexPath.row].timeStamp
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
