//
//  HomeViewController.swift
//  iOS
//
//  Created by Khaled AlObaid on 1/30/17.
//  Copyright © 2017 TripleAteam. All rights reserved.
//

import UIKit
import Firebase

class HomeViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    @IBOutlet weak var contactTabelView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        
        return 3
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = contactTabelView.dequeueReusableCell(withIdentifier: "contactCell") as! ContactTableViewCell
        
        cell.contackName.text = "Khalid Alobaid"
        
        return cell
    }
    
}
