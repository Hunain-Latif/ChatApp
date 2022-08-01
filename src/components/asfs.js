<Stack.Screen name="home" options={{
            headerRight:()=>
            <MaterialIcons
            name="account-circle"
            size={34}
            color="green"
            style={{marginRight:10}}
            onPress={()=>{
              firestore().collection('users')
              .doc(user.uid)
              .update({
                status:firestore.FieldValue.serverTimestamp()
              }).then(()=>{
                   auth().signOut()
              })


            }}
            />,
            title: "WhatsApp"
          }}
          > 

             {props => <HomeScreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="chat" options={({ route }) => ({ title: <View><Text>{route.params.name}</Text><Text>{route.params.status}</Text></View> })}>
            {props => <ChatScreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="account">
            {props => <AccountScreen {...props} user={user} />}
          </Stack.Screen>