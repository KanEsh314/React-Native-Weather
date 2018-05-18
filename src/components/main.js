import React from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { FlatList, ActivityIndicator, Text, ScrollView, View, ToastAndroid, ToolbarAndroid } from 'react-native';

export default class Main extends React.Component {

  constructor(props){
      super(props);
      this.state ={ isLoading: true}
    }

    componentDidMount(){
    return fetch('http://api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10&appid=9fd7a449d055dba26a982a3220f32aa2')
      .then((response) => response.json())
      .then((responseJson) => {

        //console.log(responseJson.list[0].weather);

        this.setState({
          isLoading: false,
          dataSource: responseJson.list,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      
      <ScrollView style={{flex: 1, padding: 20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={
            ({item}) => 
              <Card>
                <CardImage 
                  source={{uri: 'http://www.meteoweb.eu/wp-content/uploads/2017/08/pioggia.jpg'}}
                  title={item.weather[0].main}
                />
                <CardTitle
                  subtitle={item.weather[0].description}
                />
                {/* <CardContent text={item.pressure}/> */}
                <CardAction 
                  separator={true} 
                  inColumn={false}>
                  <CardButton
                    onPress={() => {}}
                    title="Share"
                    color="#FEB557"
                  />
                <CardButton
                  onPress={() => {
                    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
                  }}
                  title="Explore"
                  color="#FEB557"
                  />
    </CardAction>
              </Card>
            }
          keyExtractor={(item) => item.toString()}
        />
      </ScrollView>
    );
  }
}