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
    
    
    @IBOutlet weak var textField: UITextField!
    @IBOutlet weak var messageTable: UITableView!
    var receiver = ""

    @IBAction func didClickBack(_ sender: Any) {
        dismiss(animated: true)
    }
    

    @IBAction func didClickSend(_ sender: Any) {
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 4
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = messageTable.dequeueReusableCell(withIdentifier: "messageCell", for: indexPath)
        return cell
    }

}
