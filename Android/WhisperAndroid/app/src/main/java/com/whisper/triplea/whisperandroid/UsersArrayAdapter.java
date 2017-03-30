package com.whisper.triplea.whisperandroid;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

/**
 * Created by Nico on 28/03/2017.
 */

public class UsersArrayAdapter extends BaseAdapter {

    private List<User> userData;
    private Context context;


    public UsersArrayAdapter(List<User> userData, Context context) {
        this.userData = userData;
        this.context = context;
    }

    @Override
    public int getCount() {
        return userData.size();
    }

    @Override
    public Object getItem(int i) {
        return userData.get(i);
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
        title.setText(userData.get(i).getName());
        return (row);

    }
}
