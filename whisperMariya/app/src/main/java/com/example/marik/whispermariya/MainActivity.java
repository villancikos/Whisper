package com.example.marik.whispermariya;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import static android.R.attr.key;
import static android.R.attr.tag;

public class MainActivity extends AppCompatActivity{

    private Button add_room;
    private EditText room_name;
    RelativeLayout activity_main;
    private String name;


    private ListView listView;
    private ArrayAdapter<String> arrayAdapter;

    private ArrayList<String> list_of_rooms = new ArrayList<>();
    private DatabaseReference root = FirebaseDatabase.getInstance().getReference().getRoot();
    private DatabaseReference participantsDatabaseReference;
    private final int USER_CHAT_CREATION = 9;
    private int id = 0;
    private Set<String> set = new HashSet<String>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        activity_main = (RelativeLayout) findViewById(R.id.activity_main);
        add_room = (Button) findViewById(R.id.addButton);
        listView = (ListView) findViewById(R.id.lvChatList);

        name = getIntent().getStringExtra("username");

        arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, list_of_rooms);
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
                    DataSnapshot actualData = (DataSnapshot)i.next();
                    String currentUserID = FirebaseAuth.getInstance().getCurrentUser().getUid();
                    if(actualData.child(currentUserID).exists()) {
                        Iterator<DataSnapshot> participants = actualData.getChildren().iterator();
                        while(participants.hasNext()){
                            String participantKey = participants.next().getKey();
                            if(!participantKey.equalsIgnoreCase(currentUserID)){
                                convertReceiverUIDToName(participantKey);
                            }
                        }
                    }
                }

                list_of_rooms.clear();
                list_of_rooms.addAll(set);
                arrayAdapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(getApplicationContext(), Chat_room.class);
                intent.putExtra("room_name",((TextView)view).getText().toString());
                intent.putExtra("user_name",name);
                startActivity(intent);
            }
        });


    }

    private void convertReceiverUIDToName(String receiverID){
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference().child("users").child(receiverID).child("name");
        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if(snapshot.getValue()!=null) {
                    set.add((String) snapshot.getValue());
                    list_of_rooms.clear();
                    list_of_rooms.addAll(set);
                    arrayAdapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }

        });
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode == Activity.RESULT_OK) {
            if(requestCode == USER_CHAT_CREATION) {

                Map<String, Object> mapParticipants = new HashMap<String, Object>();
                mapParticipants.put(name, true);
                mapParticipants.put(data.getStringExtra("key"), true);

                //map.put(""+id, mapParticipants); //Change to name
                //id ++;
                DatabaseReference ref = participantsDatabaseReference.push();
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