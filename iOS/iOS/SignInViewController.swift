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
    @IBAction func didClickSignIn(_ sender: Any) {
        
        let email = self.emailTextField.text
        let password = self.passwordTextField.text
        
        
        FIRAuth.auth()?.signIn(withEmail: email!, password: password!) { (user, error) in
            if let error = error
            {
                // create the alert
                let alert = UIAlertController(title: "Wrong email or password", message: "sign up to Whisper or reset you password", preferredStyle: UIAlertControllerStyle.alert)
                
                // add an action (button)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                
                // show the alert
                self.present(alert, animated: true, completion: nil)
                
            print("wrong user or password")
            }else {
                // create the alert
                let alert = UIAlertController(title: "sign in successfully!", message: "we still develping Whisper, thank you for your patience!", preferredStyle: UIAlertControllerStyle.alert)
                
                // add an action (button)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                
                // show the alert
                self.present(alert, animated: true, completion: nil)
            print("signed in!")
                
            }
            
        }
        
        
        
    }
    @IBAction func didClickSignUp(_ sender: Any) {
        
        
        
        
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
