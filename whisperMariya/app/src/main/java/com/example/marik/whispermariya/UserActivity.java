/*
package com.example.marik.whispermariya;

import android.content.Context;
import android.util.Log;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

*/
/**
 * Created by marik on 25/03/2017.
 *//*


public class UserActivity {
    private static final String TAG = "ChatInteractor";


    interface Interactor {
        void sendMessageToFirebaseUser(Context context, Chat chat, String receiverFirebaseToken);

        void getMessageFromFirebaseUser(String senderUid, String receiverUid);
    }

    interface OnSendMessageListener {
        void onSendMessageSuccess();

        void onSendMessageFailure(String message);
    }

    interface OnGetMessagesListener {
        void onGetMessagesSuccess(Chat chat);

        void onGetMessagesFailure(String message);
    }
    public class ChatInteractor  {


        private OnSendMessageListener mOnSendMessageListener;
        private OnGetMessagesListener mOnGetMessagesListener;

        public ChatInteractor(OnSendMessageListener onSendMessageListener) {
            this.mOnSendMessageListener = onSendMessageListener;
        }

        public ChatInteractor(OnGetMessagesListener onGetMessagesListener) {
            this.mOnGetMessagesListener = onGetMessagesListener;
        }

        public ChatInteractor(OnSendMessageListener onSendMessageListener,
                              OnGetMessagesListener onGetMessagesListener) {
            this.mOnSendMessageListener = onSendMessageListener;
            this.mOnGetMessagesListener = onGetMessagesListener;
        }

        @Override
        public void sendMessageToFirebaseUser(final Context context, final Chat chat, final String receiverFirebaseToken) {
            final String room_type_1 = chat.senderUid + "_" + chat.receiverUid;
            final String room_type_2 = chat.receiverUid + "_" + chat.senderUid;

            final DatabaseReference databaseReference = FirebaseDatabase.getInstance().getReference();

            databaseReference.child("chat_rooms").getRef().addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    if (dataSnapshot.hasChild(room_type_1)) {
                        Log.e(TAG, "sendMessageToFirebaseUser: " + room_type_1 + " exists");
                        databaseReference.child("chat_rooms").child(room_type_1).child(String.valueOf(chat.timestamp)).setValue(chat);
                    } else if (dataSnapshot.hasChild(room_type_2)) {
                        Log.e(TAG, "sendMessageToFirebaseUser: " + room_type_2 + " exists");
                        databaseReference.child("chat_rooms").child(room_type_2).child(String.valueOf(chat.timestamp)).setValue(chat);
                    } else {
                        Log.e(TAG, "sendMessageToFirebaseUser: success");
                        databaseReference.child("chat_rooms").child(room_type_1).child(String.valueOf(chat.timestamp)).setValue(chat);
                        getMessageFromFirebaseUser(chat.senderUid, chat.receiverUid);
                    }

                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    mOnSendMessageListener.onSendMessageFailure("Unable to send message: " + databaseError.getMessage());
                }
            });
        }


        @Override
        public void getMessageFromFirebaseUser(String senderUid, String receiverUid) {
            final String room_type_1 = senderUid + "_" + receiverUid;
            final String room_type_2 = receiverUid + "_" + senderUid;

            final DatabaseReference databaseReference = FirebaseDatabase.getInstance().getReference();

            databaseReference.child("chat_rooms").getRef().addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    if (dataSnapshot.hasChild(room_type_1)) {
                        Log.e(TAG, "getMessageFromFirebaseUser: " + room_type_1 + " exists");
                        FirebaseDatabase.getInstance()
                                .getReference()
                                .child("chat_rooms")
                                .child(room_type_1).addChildEventListener(new ChildEventListener() {
                            @Override
                            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                                Chat chat = dataSnapshot.getValue(Chat.class);
                                mOnGetMessagesListener.onGetMessagesSuccess(chat);
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
                                mOnGetMessagesListener.onGetMessagesFailure("Unable to get message: " + databaseError.getMessage());
                            }
                        });
                    } else if (dataSnapshot.hasChild(room_type_2)) {
                        Log.e(TAG, "getMessageFromFirebaseUser: " + room_type_2 + " exists");
                        FirebaseDatabase.getInstance()
                                .getReference()
                                .child("chat_rooms")
                                .child(room_type_2).addChildEventListener(new ChildEventListener() {
                            @Override
                            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                                Chat chat = dataSnapshot.getValue(Chat.class);
                                mOnGetMessagesListener.onGetMessagesSuccess(chat);
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
                                mOnGetMessagesListener.onGetMessagesFailure("Unable to get message: " + databaseError.getMessage());
                            }
                        });
                    } else {
                        Log.e(TAG, "getMessageFromFirebaseUser: no such room available");
                    }
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    mOnGetMessagesListener.onGetMessagesFailure("Unable to get message: " + databaseError.getMessage());
                }
            });
        }
    }

}
*/
