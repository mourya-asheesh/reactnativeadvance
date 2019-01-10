import React, { Component } from "react";
import { Text, TouchableOpacity, View, Button, StyleSheet, Image, FlatList, ScrollView, Modal,TouchableHighlight,Alert,  } from "react-native";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import GridView from 'react-native-super-grid';
import CheckBox from 'react-native-check-box'
import { ListItem } from 'react-native-elements';



export default class DisplaydishesScreen extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state={
        modalVisible: false,
        selectedLists: [],
    }
  }
   
  isIconCheckedOrNot = (addonPrent, item, index) => {
    let selectedLists11 = this.state.selectedLists;
    let index1 = selectedLists11.indexOf(item.id)
    if(selectedLists11.includes(item.id)){
      selectedLists11.splice(index1, 1);
      this.setState({selectedLists: selectedLists11})
    }else {            
      selectedLists11.push(item.id)
      this.setState({selectedLists: selectedLists11})
    }
  }

  finishAddonSelection = (addonsParents) => {
    this.setModalVisible(!this.state.modalVisible)
    let selectedLists22 = this.state.selectedLists;
    console.log(addonsParents, 'aaaaaaaaaaaaaaa')
  }



  _renderListItem = (parentData, {item,index}) => {
    return(            
      <View >
          <CheckBox
              isChecked={this.state.selectedLists.includes(item.id)}
              onClick={() => this.isIconCheckedOrNot(parentData, item,index)}
          />
          <Text> 
           {item.name}
          </Text>
      </View>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
  
  _getAddons(dishId){
    this.setModalVisible(true)

    return fetch('http://test.curryheights.com/api/v1/dishes/'+dishId+'/addons')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          dataSource: responseJson.menu_addon_groups,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

   }

  

  render() {
    return (
      <ScrollView>
        {
          this.props.navigation.state.params.dishes.map((dish, i) => (
            <ListItem
              key={i}
              title={dish.name}
              subtitle={dish.desc}
              onPress={() =>{ this._getAddons(dish.id)} }
            />
          ))
        }
        <ScrollView>
          <Modal
            style={{ margin: 10 }}
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello asheesh  World!</Text>


                


                <FlatList
                  data={this.state.dataSource}
                  extraData={this.state}
                  renderItem={({item}) => 

                    <View>
                      <Text style={styles.bigblue} >{item.name}</Text>  
                      <FlatList
                          data={item.items}
                          renderItem={this._renderListItem.bind(this, item)}
                          keyExtractor={(item,index) => item+index}
                          showsVerticalScrollIndicator={false}
                          alwaysBounceVertical
                          extraData={this.state}
                      />

                      
                    </View>
                    
                  }
                  keyExtractor={(item, index) => index.toString()}
                />

                <Button
                  onPress={() => { this.finishAddonSelection(this.state.dataSource)}}
                  title="OK"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />


                <Button
                  onPress={() => { this.setModalVisible(!this.state.modalVisible)}}
                  title="cancel"
                  color="red"
                  accessibilityLabel="Learn more about this purple button"
                />

              </View>
            </View>
          </Modal>
        </ScrollView>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
   addonmargin: {
    margin: 10
   },
   bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});