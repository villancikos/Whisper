package com.whisper.triplea.whisperandroid;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

/**
 * Created by marik on 30/03/2017.
 */

public class ParticipantArrayAdapter  extends BaseAdapter {

    private List<Participant> chatData;

    private Context context;

    public ParticipantArrayAdapter(List<Participant> chatData, Context context ) {
        this.chatData = chatData;
        this.context = context;
    }

    @Override
    public int getCount() {
        return chatData.size();
    }

    @Override
    public Object getItem(int i) {
        return chatData.get(i);
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View row;
        row = inflater.inflate(R.layout.cellprototype, viewGroup, false);
        TextView title = (TextView) row.findViewById(R.id.user_name);
        title.setText(chatData.get(i).getUserName());
        return (row);

    }
}
