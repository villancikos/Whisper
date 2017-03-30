package com.whisper.triplea.whisperandroid;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RelativeLayout;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private Button add_room;
    private EditText room_name;
    RelativeLayout activity_main;
    private String name;


    private ListView listView;
    private ParticipantArrayAdapter arrayAdapter;

    private ArrayList<Participant> list_of_rooms = new ArrayList<>();
    private DatabaseReference root = FirebaseDatabase.getInstance().getReference().getRoot();
    private DatabaseReference participantsDatabaseReference,userReference;
    private final int USER_CHAT_CREATION = 9;
    private int id = 0;
    private ArrayList<Participant> set = new ArrayList<>();
    private HashMap<String, Participant> participantsListKeeper = new HashMap<String, Participant>();
    Intent intent;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        intent = new Intent(getApplicationContext(), Chat_room.class);

        activity_main = (RelativeLayout) findViewById(R.id.activity_main);
        add_room = (Button) findViewById(R.id.addButton);
        listView = (ListView) findViewById(R.id.lvChatList);

        name = getIntent().getStringExtra("username");
        userReference = FirebaseDatabase.getInstance().getReference().child("users");

        arrayAdapter =   new ParticipantArrayAdapter(list_of_rooms, this);
        listView.setAdapter(arrayAdapter);

        add_room.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 Intent intent = new Intent(getApplicationContext(),UserListActivity.class);
                startActivityForResult(intent, USER_CHAT_CREATION);
            }
        });
        participantsDatabaseReference = root.child("participants");

        participantsDatabaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Iterator i = dataSnapshot.getChildren().iterator();


                while(i.hasNext()){
                    Participant participant = new Participant();
                    DataSnapshot actualData = (DataSnapshot)i.next();
                    String currentUserID = FirebaseAuth.getInstance().getCurrentUser().getUid();
                    if(actualData.child(currentUserID).exists()) {
                        participant.setParticipantKey(actualData.getKey());
                        Iterator<DataSnapshot> participants = actualData.getChildren().iterator();
                        while(participants.hasNext()){
                            String participantKey = participants.next().getKey();
                            if(!currentUserID.equalsIgnoreCase(participantKey)){
                                participantsListKeeper.put(participantKey, participant);
                                intent.putExtra("receiver_id", participantKey);
                                convertReceiverUIDToName(participantKey);
                            }
                        }
                    }
                }

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String key = ((Participant)parent.getAdapter().getItem(position)).getParticipantKey();
                intent.putExtra("room_name", key);
                intent.putExtra("receiver_name",((Participant)((ParticipantArrayAdapter)parent.getAdapter()).getItem(position)).getUserName());
                getCurrentUserName(name);
            }
        });


    }

    private void getCurrentUserName(String userID){
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference().child("users").child(name).child("name");
        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if(snapshot.getValue()!=null) {
                    intent.putExtra("user_name",snapshot.getValue().toString());
                    startActivity(intent);
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }

        });
    }

    private void convertReceiverUIDToName(String receiverID){
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference().child("users").child(receiverID).child("name");
        list_of_rooms.clear();
        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if(snapshot.getValue()!=null) {
                    Participant participant = participantsListKeeper.get(snapshot.getRef().getParent().getKey());
                    if(participant!=null) {
                        String particName = snapshot.getValue().toString();
                        if(!checkIfListAlreadyContainsParticipant(particName)) {
                            participant.setUserName(particName);
                            set.add(participant);
                            list_of_rooms.clear();
                            list_of_rooms.addAll(set);
                        }
                    }
                    arrayAdapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }

        });
    }

    public boolean checkIfListAlreadyContainsParticipant(String name){
        for (Participant participant: set) {
            if(participant.getUserName().equalsIgnoreCase(name)){
                return true;
            }
        }
        return false;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode == Activity.RESULT_OK) {
            if(requestCode == USER_CHAT_CREATION) {

                String peerUID = data.getStringExtra("key");
                Map<String, Object> mapParticipants = new HashMap<String, Object>();
                mapParticipants.put(name, true);
                mapParticipants.put(peerUID, true);

                //map.put(""+id, mapParticipants); //Change to name
                //id ++;
                DatabaseReference ref = participantsDatabaseReference.push();
                Map<String, Object> mapConversations = new HashMap<String, Object>();
                mapConversations.put(ref.getKey(), true);
                userReference = FirebaseDatabase.getInstance().getReference().child("users").child(name).child("conversations");
                userReference.updateChildren(mapConversations);
                userReference = FirebaseDatabase.getInstance().getReference().child("users").child(peerUID).child("conversations");
                userReference.updateChildren(mapConversations);
                ref.updateChildren(mapParticipants);
            }
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.menu_signout) {
            FirebaseAuth.getInstance().signOut();
            Intent i = new Intent(MainActivity.this, LoginActivity.class);
            startActivity(i);
            finish();
        }
        return true;
    }




}