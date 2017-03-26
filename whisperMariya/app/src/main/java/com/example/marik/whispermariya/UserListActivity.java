package com.example.marik.whispermariya;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by marik on 26/03/2017.
 */

public class UserListActivity extends Activity {
    private ListView userList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.userlist_activity);
        userList = (ListView) findViewById(R.id.lvUserList);
    }

    @Override
    protected void onStart() {
        super.onStart();
        getAllUsersFromFirebase();
        userList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //// TODO: 26/03/2017 whenever an item is selected you wil have to retrieve the name of such item and return it
                // to the main activity as it called us on a activityForResult we should add it as a Extra called in this case
                // "name" but you can change it later on.
                String user = parent.getAdapter().getItem(position).toString();
                // Launching new Activity on selecting single List Item
                Intent i = new Intent();
                // sending data to new activity
                i.putExtra("name", user);
                setResult(Activity.RESULT_OK,i);
                finish();

            }
        });
    }

    public void getAllUsersFromFirebase() {
        final List<String> users = new ArrayList<>();
        final ArrayAdapter<String> usersAdapter = new ArrayAdapter<String>(UserListActivity.this, android.R.layout.simple_list_item_1, users);
        userList.setAdapter(usersAdapter);
        FirebaseDatabase.getInstance()
                .getReference()
                .child("users")
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        Iterator<DataSnapshot> dataSnapshots = dataSnapshot.getChildren()
                                .iterator();
                        while (dataSnapshots.hasNext()) {
                            DataSnapshot dataSnapshotChild = dataSnapshots.next();
                            User user = dataSnapshotChild.getValue(User.class);
                            if (!TextUtils.equals(user.name,
                                    FirebaseAuth.getInstance().getCurrentUser().getUid())) {
                                users.add(user.getName());
                            }
                        }
                        usersAdapter.notifyDataSetChanged();
                    }


                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        // Unable to retrieve the users.
                    }
                });
    }
}
