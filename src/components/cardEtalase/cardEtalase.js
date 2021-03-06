import React, {useState, Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import styles from './cardEtalase.style';
import {Icon} from 'react-native-elements';

class CardEtalase extends Component {
  constructor() {
    super();
    this.state = {Quantity: 0};
  }

  render() {
    const {
      container,
      name,
      image,
      price,
      priceText,
      unit,
      beli,
      kuantity,
    } = styles;

    const goToDetail = () => {
      this.props.navigation.navigate('AddProduct', {
        title: 'Edit',
        id_product: this.props.id_product,
        nama_produk: this.props.name,
        price: this.props.price,
        unit: this.props.unit,
        label: this.props.label,
        desc_produk: this.props.desc_product,
        stock: this.props.stock,
        id_category: this.props.id_category,
      });
    };

    return (
      <TouchableOpacity onPress={() => goToDetail()}>
        <View style={container}>
          <View style={image}>
            <Text
              style={{
                fontSize: 10,
                marginTop: 20,
                padding: 5,
                backgroundColor: 'gray',
                color: 'white',
              }}>
              {this.props.label}
            </Text>
          </View>
          <Text style={name}>{this.props.name}</Text>
          <Text style={{color: 'gray', fontSize: 12}}>{this.props.label}</Text>
          <View style={price}>
            <Text style={priceText}>Rp {this.props.price}</Text>
            <Text style={unit}> / {this.props.unit}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CardEtalase;
