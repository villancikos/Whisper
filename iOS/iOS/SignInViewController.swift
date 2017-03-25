//
//  SignInViewController.swift
//  iOS
//
//  Created by Khaled AlObaid on 1/30/17.
//  Copyright © 2017 TripleAteam. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth


class SignInViewController: UIViewController {
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var alertMessage: UILabel!
    
    
    @IBAction func didClickSignIn(_ sender: Any) {
        let email = self.emailTextField.text
        let password = self.passwordTextField.text
        
        FIRAuth.auth()?.signIn(withEmail: email!, password: password!) { (user, error) in
            if let error = error
            {
            // if one field is empty, show message
                if (self.emailTextField.text==""){
                    self.alertMessage.text = "Email is required"
                }else if (self.passwordTextField.text==""){
                    self.alertMessage.text = "Password is required"
                }else{
                    self.alertMessage.text = "Email or password is incorrect"
                }
            }else {
                self.performSegue(withIdentifier: "allUsers", sender: self)
            }
        }
    }
    
    
    @IBAction func didClickSignUp(_ sender: Any) {
        
        
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        self.hideKeyboardWhenTappedAround()
    }

  


}
