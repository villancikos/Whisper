package com.whisper.triplea.whisperandroid;

/**
 * Created by marik on 27/02/2017.
 */


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ServerValue;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Chat_room  extends AppCompatActivity {

    private Button btn_send_msg;
    private EditText input_msg;
    private TextView chat_conversation;
    private TextView timeStamp;

    private String user_name,room_name,receiver_name,receiver_id;
    private DatabaseReference chatReference,lastReference;
    private String temp_key;
    private Object timeMes = ServerValue.TIMESTAMP;
    private String sender;
    private String receiver;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.chat_room);

        btn_send_msg = (Button) findViewById(R.id.sendButton);
        input_msg = (EditText) findViewById(R.id.tvMessage);
        chat_conversation = (TextView) findViewById(R.id.tvChtMes);

        user_name = getIntent().getExtras().get("user_name").toString();
        room_name = getIntent().getExtras().get("room_name").toString();
        receiver_name = getIntent().getExtras().get("receiver_name").toString();
        receiver_id = getIntent().getExtras().get("receiver_id").toString();
        setTitle(receiver_name);

        chatReference = FirebaseDatabase.getInstance().getReference().child("messages").child(getIntent().getStringExtra("room_name"));
        lastReference = FirebaseDatabase.getInstance().getReference().child("conversations").child(room_name);

        btn_send_msg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Map<String, Object> map = new HashMap<String, Object>();
                temp_key = chatReference.push().getKey();
                chatReference.updateChildren(map);

                DatabaseReference message_root = chatReference.child(temp_key);
                Map<String, Object> map2 = new HashMap<String, Object>();
                map2.put("sender", FirebaseAuth.getInstance().getCurrentUser().getUid());
                map2.put("content", input_msg.getText().toString());
                map2.put("timestamp", timeMes);
                map2.put("receiver",receiver_id);
                map2.put("typeOfContent","text");//Remember to change it if asked to add other types of content

                Map<String, Object> lastMessage = new HashMap<String, Object>();
                lastMessage.put("last_message", input_msg.getText().toString());
                lastMessage.put("sender", FirebaseAuth.getInstance().getCurrentUser().getUid());
                lastMessage.put("timestamp", timeMes);
                lastReference.updateChildren(lastMessage);

                message_root.updateChildren(map2);
            }
        });



        chatReference.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
//
            append_chat_conversation(dataSnapshot);
                }




            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

    }
    /**/

    private String chat_msg,chat_user_name,chat_receiver_name,type;
    private Object chat_message_time;

    private void append_chat_conversation(DataSnapshot dataSnapshot) {

        Iterator i = dataSnapshot.getChildren().iterator();

        while (i.hasNext()){

                chat_msg = (String) ((DataSnapshot) i.next()).getValue();
                chat_user_name = (String) ((DataSnapshot) i.next()).getValue();
                chat_receiver_name = (String) ((DataSnapshot) i.next()).getValue();
                chat_message_time = String.valueOf(((DataSnapshot) i.next()).getValue());
                type = String.valueOf(((DataSnapshot) i.next()).getValue());

                String senderMessage = input_msg.getText().toString().trim();
            String nameToShow = "";
                if(!FirebaseAuth.getInstance().getCurrentUser().getUid().equalsIgnoreCase(chat_receiver_name)){
                    nameToShow = receiver_name;
                }else{
                    nameToShow = user_name;
                }
                SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
            String time = "";
            Date servDate = new Date(Long.parseLong(String.valueOf(chat_message_time)));
            time = sdf.format(servDate);
            chat_conversation.append( nameToShow + " : " + chat_msg + "\n" + time + "\n");
                input_msg.setText("");


        }


    }







}



