//
//  resetPasswordViewController.swift
//  iOS
//
//  Created by Obolo Oluremi on 01/03/2017.
//  Copyright © 2017 TripleAteam. All rights reserved.
//

import UIKit
import Firebase

class ResetPasswordViewController: UIViewController {

    @IBAction func didClickCancel(_ sender: Any) {
        
        dismiss(animated: true, completion: nil)
        
    }
    @IBAction func didClickReset(_ sender: Any) {
        
        restPassword()
        print("reset email sent!")
        
    }
    @IBOutlet weak var emailTextField: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }

    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    func restPassword() {
        
        let userInput = emailTextField.text
        
        FIRAuth.auth()?.sendPasswordReset(withEmail: userInput!) { (error) in
            // ...
        }
        
    }
    

}
