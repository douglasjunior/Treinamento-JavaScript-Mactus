import React, { Component } from 'react';
import {
  View, Text, Image,
  StyleSheet, Dimensions,
  ScrollView, FlatList,
  StatusBar,
} from 'react-native';

import CardView from './src/components/CardView';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dddddd',
    // flex: 1,
    padding: 16
  },
  // painelA: {
  //   backgroundColor: 'red',
  //   flex: 1
  // },
  // painelB: {
  //   backgroundColor: 'green',
  //   flex: 2
  // },
  // painelC: {
  //   position: 'absolute',
  //   backgroundColor: 'blue',
  //   left: 10,
  //   top: 10,
  //   height: 100,
  //   width: 100
  // }

});

const imageSource = {
  uri: 'https://img.elo7.com.br/product/zoom/FBCE34/adesivo-paisagem-praia-decorando-com-adesivos.jpg'
};

const DADOS = [
  { id: 1, imagem: imageSource, titulo: 'Item A', descricao: 'Descrição do item A' },
  { id: 2, imagem: require('./src/drawables/imagem1.jpg'), titulo: 'Item B', descricao: 'Descrição do item B' },
  { id: 3, imagem: require('./src/drawables/imagem2.jpg'), titulo: 'Item C', descricao: 'Descrição do item C' },
  { id: 4, imagem: imageSource, titulo: 'Item A', descricao: 'Descrição do item A' },
  { id: 5, imagem: require('./src/drawables/imagem1.jpg'), titulo: 'Item B', descricao: 'Descrição do item B' },
  { id: 6, imagem: require('./src/drawables/imagem2.jpg'), titulo: 'Item C', descricao: 'Descrição do item C' },
  { id: 7, imagem: imageSource, titulo: 'Item A', descricao: 'Descrição do item A' },
  { id: 8, imagem: require('./src/drawables/imagem1.jpg'), titulo: 'Item B', descricao: 'Descrição do item B' },
  { id: 9, imagem: require('./src/drawables/imagem2.jpg'), titulo: 'Item C', descricao: 'Descrição do item C' },
  { id: 10, imagem: imageSource, titulo: 'Item A', descricao: 'Descrição do item A' },
  { id: 11, imagem: require('./src/drawables/imagem1.jpg'), titulo: 'Item B', descricao: 'Descrição do item B' },
  { id: 12, imagem: require('./src/drawables/imagem2.jpg'), titulo: 'Item C', descricao: 'Descrição do item C' },
];

export default class App extends Component {

  // render() {
  //   return (
  //     <ScrollView>
  //       <View style={styles.container}>
  //         {/* <View style={styles.painelA} />
  //           <View style={styles.painelB} />
  //         <View style={styles.painelC} /> */}

  //         <CardView image={imageSource}
  //           title="Card A"
  //           text="Este é o texto do Card A" />
  //         <CardView image={require('./src/drawables/imagem1.jpg')}
  //           title="Card B"
  //           text="Este é o texto do Card B" />
  //         <CardView image={require('./src/drawables/imagem2.jpg')}
  //           title="Card C"
  //           text="Este é o texto do Card C" />

  //         <CardView image={imageSource}
  //           title="Card A"
  //           text="Este é o texto do Card A" />
  //         <CardView image={require('./src/drawables/imagem1.jpg')}
  //           title="Card B"
  //           text="Este é o texto do Card B" />
  //         <CardView image={require('./src/drawables/imagem2.jpg')}
  //           title="Card C"
  //           text="Este é o texto do Card C" />

  //         <CardView image={imageSource}
  //           title="Card A"
  //           text="Este é o texto do Card A" />
  //         <CardView image={require('./src/drawables/imagem1.jpg')}
  //           title="Card B"
  //           text="Este é o texto do Card B" />
  //         <CardView image={require('./src/drawables/imagem2.jpg')}
  //           title="Card C"
  //           text="Este é o texto do Card C" />

  //         <CardView image={imageSource}
  //           title="Card A"
  //           text="Este é o texto do Card A" />
  //         <CardView image={require('./src/drawables/imagem1.jpg')}
  //           title="Card B"
  //           text="Este é o texto do Card B" />
  //         <CardView image={require('./src/drawables/imagem2.jpg')}
  //           title="Card C"
  //           text="Este é o texto do Card C" />

  //       </View>
  //     </ScrollView>
  //   );

  renderItem = (record) => {
    const { item, index } = record;
    return (
      <CardView image={item.imagem}
        title={item.id + ' - ' + item.titulo}
        text={item.descricao} />
    );
  }

  render() {
    return (
      <View>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <FlatList
          data={DADOS}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.container}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

}
