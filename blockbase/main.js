import React,{Component} from 'react';
import {StyleSheet,View,Text,ScrollView, TouchableOpacity} from 'react-native';

class Main extends Component{

  state={
    status:'',
  }

  transact=(item)=>{
    this.props.transaction(item.hash)
  }
  componentDidMount=()=>{
    const key=this.props.public_key
    const url='https://blockbase-app.herokuapp.com/assets_owned?public_key='+key
    fetch(url)
    .then((response)=>response.json())
    .then((resp)=>{
      resp=JSON.stringify(resp)
      resp=JSON.parse(resp)
      this.props.items(resp)
    })
    .catch((error)=>{
      this.setState({status:'error'})
    })
  }

  render(){
    return(
      <View style={styles.parent}>
      <ScrollView style={styles.main}>
      <Text style={styles.info}>Info</Text>
      <Text style={styles.keys}>username:{this.props.public_key}
      </Text>
      <Text style={styles.keys}>private key:{this.props.private_key}
      </Text>
      <Text style={styles.info}>Assets owned</Text>
        {this.props.assets.map((item,number)=>(
        <TouchableOpacity style={styles.item}>
          <View style={styles.num}>
            <Text style={styles.num_text}>{item.number}</Text>
          </View>
          <View style={styles.hash}>
            <Text numberOfLines={1} style={styles.hash_text}>{item.asset_tag}
            </Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.date_text}>{item.desc}</Text>
          </View>
        </TouchableOpacity>))
        }
      </ScrollView>
      <Text>{this.state.status}</Text>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  parent:{
    flex:1,
  },
  main:{
    marginLeft:10,
    height:'100%'
  },
  info:{
    fontSize:14,
    textDecorationLine: 'underline'
  },
  keys:{
    fontSize:13,
    marginLeft:12,
  },
  item:{
    margin:4,
    height:'8%',
    flexDirection:'row',
    
  },
  num:{
    width:'10%',
    alignItems:'center',
  },
  hash:{
    width:'64%',
  },
  date:{
    width:'26%'
  },
  num_text:{
    fontSize:14,
  },
  hash_text:{
    fontSize:12,
  },
  date_text:{
    fontSize:12,
  },
})

export default Main
