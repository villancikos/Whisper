//
//  SignUpViewController.swift
//  iOS
//
//  Created by Khaled AlObaid on 1/30/17.
//  Copyright © 2017 TripleAteam. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth

class SignUpViewController: UIViewController {
    
    var ref : FIRDatabaseReference!
    
    


    @IBOutlet weak var nickNameText: UITextField!
    @IBOutlet weak var passswordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        ref = FIRDatabase.database().reference()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func didClickSignUp(_ sender: Any) {
        let nickName = self.nickNameText.text
        let email = self.emailTextField.text
        let password = self.passswordTextField.text
        
        FIRAuth.auth()?.createUser(withEmail: email!, password: password!, completion: { (user, error) in
            if let error = error {
                // handul error
            }else {
                // sign in
                self.singIn(user: user!)
                
                    
                    
                    
                
                }
            
        })
        
    }
    
    func singIn(user : FIRUser){
    
    }
    
    
    
    
    
    
    
    
}
