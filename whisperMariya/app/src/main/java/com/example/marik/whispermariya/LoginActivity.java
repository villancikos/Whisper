package com.example.marik.whispermariya;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class LoginActivity extends AppCompatActivity{

    private Button btnSingIn;
    private EditText username;
    private EditText password;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private FirebaseAuth mAuth;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        btnSingIn = (Button) findViewById(R.id.btnSignIn);
        username = (EditText) findViewById(R.id.txt_username);
        password = (EditText) findViewById(R.id.txt_password);

        //TODO Create a Registration activity, when you get the creation done dont forget to set the username to the displayname
        //TODO change the hardcoded room name to a uniqueID
        //TODO create a toast or something when the user tries to create a new conversation with a user in an existing conversation
        //TODO Update the last message of a conversation on the conversations part of the database structure.
        //TODO change on the list the last message of the conversation.
        //TODO Convert timestamp to a human readable date.
        final Intent i = new Intent(LoginActivity.this, MainActivity.class);

        mAuth = FirebaseAuth.getInstance();
        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if (user != null) {
                    // User is signed in
                    Log.d("Hello", "onAuthStateChanged:signed_in:" + user.getUid());
                    i.putExtra("username", user.getUid());
                    startActivity(i);
                } else {
                    // User is signed out
                    Log.d("You are signed out", "onAuthStateChanged:signed_out");

                }
            }
        };

        FirebaseAuth auth = FirebaseAuth.getInstance();
        if(auth.getCurrentUser() != null) {
            //Toast.makeText(LoginActivity.this, "You are already signed in", Toast.LENGTH_LONG).show();
            i.putExtra("username", auth.getCurrentUser().getUid());
            startActivity(i);
        }

        btnSingIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    mAuth.signInWithEmailAndPassword(username.getText().toString(), password.getText().toString())
                            .addOnCompleteListener(LoginActivity.this, new OnCompleteListener<AuthResult>() {
                                @Override
                                public void onComplete(@NonNull Task<AuthResult> task) {
                                    Log.d("Hello", "signInWithEmail:onComplete:" + task.isSuccessful());
                                    if (!task.isSuccessful()) {
                                        Log.w("you are signed out", "signInWithEmail:failed", task.getException());
                                        Toast.makeText(LoginActivity.this, "Please try again",
                                                Toast.LENGTH_SHORT).show();
                                    }

                                }
                            });
            }
        });

    }

    @Override
    public void onStart() {
        super.onStart();
        mAuth.addAuthStateListener(mAuthListener);
    }

    @Override
    public void onStop() {
        super.onStop();
        if (mAuthListener != null) {
            mAuth.removeAuthStateListener(mAuthListener);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;
    }

}