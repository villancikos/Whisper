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
        resetPassword()
    }
    @IBOutlet weak var emailTextField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }

    
    func resetPassword() {
        // handule reset function
        let userEmail = emailTextField.text
        // pop up meaasge and dismiss
        popUpMsgAndDismiss(title : "Reset password", message : "reset email will be sent only if this email exist in our database", buttonTitle : "Sounds good!")
        // database reset side
        FIRAuth.auth()?.sendPasswordReset(withEmail: userEmail!) { (error) in
            // ...
        }
        
    }
    

}
