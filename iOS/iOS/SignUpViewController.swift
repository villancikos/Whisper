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
        dismiss(animated: true)
    }
    
    @IBOutlet weak var alertMessage: UILabel!
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!

    @IBAction func didClickSignUp(_ sender: Any) {
        handleSignUp()
    }
    @IBOutlet weak var passwordTextField: UITextField!
    
    
    func handleSignUp(){
        //this func handles sign up to Whisper
        
        if ((nameTextField.text?.isEmpty)! || (emailTextField.text?.isEmpty)! || (passwordTextField.text?.isEmpty)!){
            // one field or more is empty
            self.alertMessage.text = "Please enter all fields"
        }else {
            
            let email = self.emailTextField.text
            let password = self.passwordTextField.text
            let name = self.nameTextField.text
            
            FIRAuth.auth()?.createUser(withEmail: email!, password: password!) { (user, error) in
                if error != nil {
                    // show message "dose not meet constrans"
                    self.alertMessage.text = "enter correct email and =>6 digits pass"
                }else{
                    // will come here only if user and pass are in correct format (email style + 6 digit password)
                    // save user email and name into DB
                    let ref = FIRDatabase.database().reference()
                    let imageURL = "http://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                    let userId = user?.uid
                    let info = ["name" : name, "email" : email, "profile_pic" : imageURL, "lastSeen" : self.timeStamp()] as [String : Any]
                    ref.child("users").child(userId!).setValue(info)
                    // go to users list UI
                    self.performSegue(withIdentifier: "allUsers", sender: self)
                }
            }
        }
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.hideKeyboardWhenTappedAround()
        // Do any additional setup after loading the view.
    }

   
}
