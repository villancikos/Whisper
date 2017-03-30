//
//  SharedFucn.swift
//  iOS
//
//  Created by Khaled AlObaid on 3/22/17.
//  Copyright © 2017 TripleAteam. All rights reserved.
//

import Foundation
import UIKit

// a structure to make array of users in less code anywhere in any class
struct users {
    let userId : String!
    let name : String!
    let imageUrl : String!
    let email : String!
    let timeStamp : Int!
}
// a structure to make array of conversation in less code anywhere in any class
struct conversation {
    let lastMessage : String!
    let sender : String!
    let timeStamp : String!
}


// a structure to make array of messages in less code anywhere in any class
struct messageStruct {
    let sender : String!
    let receiver : String!
    let content : String!
    let typeOfContent : String!
    let timestamp : String!
}



extension UIViewController {

    // retrun 13 digit integer timestamp, just use timestamp = timeStamp() anywhere in the app
    func timeStamp() ->Int {
        let time = Int(Date().timeIntervalSince1970 * 1000)
        return time
    }

    // retrun 13 digit integer timestamp, just use timestamp = timeStamp() anywhere in the app
    func currentTimeStamp() ->String {
        let time = String(Date().timeIntervalSince1970 * 1000)
        return time
    }
    
    // hide keyboard if user click anywhere, code by @Esqarrouth from http://stackoverflow.com/
    // put self.hideKeyboardWhenTappedAround() in viewDidLoad() at any UIController
    
    func hideKeyboardWhenTappedAround() {
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
    }
    
    func dismissKeyboard() {
        view.endEditing(true)
    }

    
    // popup messsage and dismiss
    
    func popUpMsgAndDismiss(title : String, message : String, buttonTitle : String){
        
        let title = title
        let message = message
        let buttonTitle = buttonTitle
        
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        let alertAction = UIAlertAction(title: buttonTitle, style: .default, handler: { ACTION in self.dismiss(animated: true, completion: nil)})
        alertController.addAction(alertAction)
        self.present(alertController, animated: true, completion: nil)
    }



}


    
