import React from 'react';
import { Text, View,StyleSheet,TextInput,Button,FlatList,RefreshControl,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator,Image,ListView} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json

class TambahScreen extends React.Component {
  constructor()
  {
      super();
      this.state = {
        nama: '',
        alamat: '',
        telpon: '',
        ActivityIndicator_Loading: false,
      }
  }

Insert_Data_Into_MySQL = () =>
  {
      this.setState({ ActivityIndicator_Loading : true }, () =>
      {
          fetch('http://gusnando.com/mobile/uce/tambahtempatmakan.php',
          {
              method: 'POST',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                nama : this.state.nama,
                telpon : this.state.telpon,
                alamat : this.state.alamat,

              })

          }).then((response) => response.json()).then((responseJsonFromServer) =>
          {
              alert(responseJsonFromServer);
              this.setState({ ActivityIndicator_Loading : false });
          }).catch((error) =>
          {
              console.error(error);
              this.setState({ ActivityIndicator_Loading : false});
          });
      });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
      <View style={{ flex: 1, alignItems:'center', justifyContent: 'center', paddingBottom: 0, paddingTop: 0 }}>
        <Image
           source={require('./foto.png')}//image
           style={{width: 200, height: 200 }}
              />
      </View>
      <View style={{ flex: 0.2, alignItems:'center', justifyContent: 'center', paddingBottom: 0, paddingTop: 0 }}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: "#990000" }}>Rumah Makan</Text>
      </View>
        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Nama Rumah Makan"

          onChangeText = {(TextInputText) => this.setState({ nama: TextInputText })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="No Hp"

          onChangeText = {(TextInputText) => this.setState({ telpon: TextInputText })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Alamat"

          onChangeText = {(TextInputText) => this.setState({ alamat: TextInputText })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
          />


        <Button title="Tambah" onPress={this.Insert_Data_Into_MySQL} color="#990000" />
</View>
    );
  }
}

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
}

_onRefresh() {
  this.setState({refreshing: true});
  fetchData().then(() => {
    this.setState({refreshing: false});
  });
}

  componentDidMount()  {
      const url = 'http://gusnando.com/mobile/uce/daftartempatmakan.php';
       this.setState({ loading: true });
      fetch (url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("comp");
        console.log(responseJson);
        this.setState({
          data: responseJson,
          error: responseJson.error || null,
          loading: false,
          refreshing: false
        });
      }
    );
  }
  _keyExtractor = (item, index) => item.nama;
  render() {
    return (
      <View style={{marginTop: 1, justifyContent:'center'}}>
      <View style={{ flex: 1, alignItems:'center', justifyContent: 'center', paddingTop: 0}}>
        <Image
           source={require('./foto.png')}//image
           style={{width: 200, height: 200 }}
              />
      </View>
      <View style={{ flex: 0.2, alignItems:'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 0 }}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: "#990000" }}>Rumah Makan</Text>
      </View>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.componentDidMount.bind(this)}
            />
          }
          renderItem={({item}) =>
            <View style={styles2.ListItem}>
              <Text style={styles.ListFirst}>Nama : {item.nama}</Text>
              <Text>No HP : {item.telpon}</Text>
              <Text>Alamat : {item.alamat}</Text>
            </View>
        }
        />



      </View>
    );
  }
}

class SearchScreen extends React.Component {
 
  constructor(props) {
 
    super(props);
 
    this.state = {
 
      isLoading: true,
      text: '',
    
    }
 
    this.arrayholder = [] ;
  }
  
 
  componentDidMount() {
 
    return fetch('http://gusnando.com/mobile/uce/daftartempatmakan.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
 
          // In this block you can do something with new state.
          this.arrayholder = responseJson ;
 
        });
      })
      .catch((error) => {
        console.error(error);
      });
      
  }
 
  GetListViewItem (nama) {
    
   Alert.alert(nama);
  
  }
  
   SearchFilterFunction(text){
     
     const newData = this.arrayholder.filter(function(item){
         const itemData = item.nama.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }
 
  ListViewItemSeparator = () => {
    return (
      <View style={{marginTop: 1, justifyContent:'center'}}>
      <View style={{ flex: 1, alignItems:'center', justifyContent: 'center', paddingTop: 0}}>
        <Image
           source={require('./foto2.png')}//image
           style={{width: 80, height: 80 }}
              />
      </View>
      <View style={{ flex: 0.2, alignItems:'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 0 }}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: "#990000" }}>Rumah Makan</Text>
      </View>

      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
      </View>
    );
  }
 
 
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
 
    return (
 
      <View style={styles.MainContainer}>
      <View style={{ flex: 1, alignItems:'center', justifyContent: 'center', paddingTop: 0}}>
        <Image
           source={require('./foto.png')}//image
           style={{width: 200, height: 200 }}
              />
      </View>
      <View style={{ flex: 0.2, alignItems:'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 0 }}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: "#990000" }}>Cari Rumah Makan</Text>
      </View>
      <TextInput 
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />
 
        <ListView
 
          dataSource={this.state.dataSource}
          
          renderSeparator= {this.ListViewItemSeparator}
          
          renderRow={(rowData) => <Text style={styles.rowViewContainer} 
 
          onPress={this.GetListViewItem.bind(this, rowData.nama)} >{rowData.nama}</Text>}
 
          enableEmptySections={true}
 
          style={{marginTop: 10}}
 
        />
 
      </View>
    );
  }
}
 
export default TabNavigator(
  {
    Search: { screen: SearchScreen },
    List: { screen: ListScreen },
    Tambah: { screen: TambahScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Tambah') {
          iconName = `ios-create${focused ? '' : '-outline'}`;
        } else if (routeName === 'List') {
          iconName = `ios-book${focused ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      style: {
       backgroundColor: '#990000'
      }
    },
    animationEnabled: false,
    swipeEnabled: true,
  }
);

const styles1 = StyleSheet.create({
  Header: {
          marginBottom: 100,
          margin: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#64B5F6',
      },
      MainContainer :{
 
        justifyContent: 'center',
        flex:1,
        margin: 7,
       
        },
       
       rowViewContainer: {
         fontSize: 17,
         padding: 10
        },
       
        TextInputStyleClass:{
              
         textAlign: 'center',
         height: 40,
         borderWidth: 1,
         borderColor: '#009688',
         borderRadius: 7 ,
         backgroundColor : "#FFFFFF"
              
         }
    });
const styles2 = StyleSheet.create({
      
      Header: {
          marginTop: 5,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#64B5F6',
      },
      TextHeader: {
          fontSize: 30
      },
      ListItem: {
          backgroundColor:'#BBDEFB',
          marginTop: 5,
          flex: 1
      },
      ListFirst: {
        fontSize: 20
      }

    });
const styles = StyleSheet.create({
  TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:"#990000",
      marginBottom: 20,
      marginLeft: 70,
      width: '70%',
      borderRadius: 0 
 
    },
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    BoxClass:
    {
      alignItems: 'flex-start',
      height: 150,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: 270,
      paddingTop: 5,
      paddingBottom: 5
    },
  MainContainer :{

  justifyContent: 'center',
  marginBottom: 50 ,
  flex:1,
  margin: 10
  },

  TextInputStyleClass: {

  textAlign: 'left',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  // Set border Hex Color Code Here.
   borderColor: '#FF5722',

  // Set border Radius.
   //borderRadius: 10 ,
 },
  });
