package com.example.marik.whispermariya;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
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
                User user = ((User)parent.getAdapter().getItem(position));
                // Launching new Activity on selecting single List Item
                Intent i = new Intent();
                // sending data to new activity
                i.putExtra("key", user.getUserId());
                i.putExtra("name", user.getName());
                setResult(Activity.RESULT_OK,i);
                finish();

            }
        });
    }

    public void getAllUsersFromFirebase() {
        final List<User> users = new ArrayList<>();
        final UsersArrayAdapter usersAdapter = new UsersArrayAdapter(users, this);
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
                                user.setUserId(dataSnapshotChild.getKey());
                                users.add(user);
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
