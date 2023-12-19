// _layout.tsx

import { Drawer } from 'expo-router/drawer';
import { SessionProvider, useSession } from '../contexts/AuthContext';
import { Text, Button } from 'react-native';
import { Link } from 'expo-router';
//this is the layout for the navigation bar
//It gets the header names based on the folder structure
export default function Layout() {

  return (
    <SessionProvider>
      <Drawer>
        <Drawer.Screen 
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />
        <Drawer.Screen
          name="(artists)"
          options={{
            drawerLabel: 'Artists',
            title: 'Artists',
          }}
        />
        <Drawer.Screen
          name="(museums)"
          options={{
            drawerLabel: 'Museums',
            title: 'Museums',
          }}
        />
        <Drawer.Screen
          name="(works)"
          options={{
            drawerLabel: 'works',
            title: 'Works',
          }}
        />
      </Drawer>
    </SessionProvider>
  );
}
