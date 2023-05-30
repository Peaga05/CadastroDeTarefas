import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import data from './data';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.8;

type Props = {
    item: {
        body: string,
        title: string,
        imagemUrl: string
    },
    index: number
}

const carouselCardsItem = ({ item, index }: Props) => {
    return (
        <View style={styles.cardCarousel} key={index}>
            <Image style={styles.imagem} source={{ uri: item.imagemUrl }} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
        </View>
    );
}

const CarouselCards = () => {
    return (
        <View style={styles.container}>
            <Carousel
                data={data}
                renderItem={carouselCardsItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                useScrollView={true}
            />
        </View>
    )
}

export default CarouselCards;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardCarousel: {
        paddingTop: 50,
        width: ITEM_WIDTH
    },
    imagem: {
        height: 300,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    title: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    body: {
        fontSize: 15,
        alignSelf: 'center'
    }
})