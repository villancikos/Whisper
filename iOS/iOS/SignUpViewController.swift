//
//  signUpViewController.swift
//  iOS
//
//  Created by Obolo Oluremi on 01/03/2017.
//  Copyright © 2017 TripleAteam. All rights reserved.
//

import UIKit
import Firebase

class SignUpViewController: UIViewController {
    @IBAction func didClickCancel(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    @IBOutlet weak var emailTextField: UITextField!

    @IBAction func didClickSignUp(_ sender: Any) {
        handleSignUp()
        
    }
    @IBOutlet weak var passwordTextField: UITextField!
    
    
    func handleSignUp(){
        //this func handles sign up to Whisper

    let email = emailTextField.text
    let password = passwordTextField.text
    
        FIRAuth.auth()?.createUser(withEmail: email!, password: password!) { (user, error) in
            if error != nil {
            print("something wrong")
            }else{
            print("new user created")
            }
        }
        
    
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

   
}
