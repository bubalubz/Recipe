import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Button, ActivityIndicator, StyleSheet, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { SearchBar, Card } from 'react-native-elements';
export const primary = '#228B22';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchResults: [],
            loading: false
        }

        this.searchRecipe = this.searchRecipe.bind(this);

    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    searchRecipe() {
        this.setState({ loading: true });
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${this.state.search}`;
        console.log(url);
        fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "eb4317d832msh5169afb3172df47p1ee286jsn24d4e5066136",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ searchResults: response.results, loading: false });
                console.log(response);

            })
            .catch(err => {
                console.error(err);
            });

    }
    render() {
        const { search } = this.state;

        return (
            <SafeAreaView>
                <View>
                    <SearchBar
                        value={search}
                        placeholder='Search for Recipe'
                        onChangeText={this.updateSearch}
                    />
                </View>
                <View >
                    <Button
                        onPress={this.searchRecipe}
                        title='Search'
                        color={primary}
                    />
                </View>
                <ScrollView>
                    {this.state.loading &&
                        <View>
                            <ActivityIndicator size='large' color={primary} />
                        </View>
                    }
                    {this.state.searchResults.length > 0 && !this.state.loading &&
                        <View>
                            <Text>You searched for {this.state.search}</Text>


                            {this.state.searchResults.map(recipe => {
                                console.log(`https://spoonacular.com/recipeImages/${recipe.image}`);
                                console.log(`${recipe.sourceUrl}`)
                                return (
                                    // <View key={recipe.id}>
                                    //     <Image source={{uri:`https://spoonacular.com/recipeImages/${recipe.image}`}} 
                                    //     style={{width: 100, height: 100}}/>
                                    // </View>

                                    


                                    // <Card
                                    //     title={recipe.title}
                                    //     image={{ uri: `https://spoonacular.com/recipeImages/${recipe.image}` }} style={{ width: 90, height: 90 }} resizeMode="cover">
                                    //     <Text
                                    //         style={{ margin: 10 }}>
                                    //         Time to cook: {recipe.readyInMinutes}
                                    //         {'\n'}Serves: {recipe.servings}
                                    //     </Text>
                                    <Card key={recipe.id}>
                                        <Card.Title>{recipe.title}</Card.Title>
                                    <Card.Divider />
                                    <View>
                                    <TouchableOpacity onPress={() => {Linking.openURL(`${recipe.sourceUrl}`)}}>
                                    <Card.Image source={{uri:`https://spoonacular.com/recipeImages/${recipe.image}`}} style={{width: 100, height: 100}} resizeMode="cover">
                                    </Card.Image>
                                    </TouchableOpacity>
                                        <Text textAlign='right'>
                                            Time to cook: {recipe.readyInMinutes}
                                            {'\n'}Serves: {recipe.servings}
                                        </Text>
                                    
                                    </View>
                                    </Card>




                                )
                            })}
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       marginTop: Constants.statusBarHeight,
//       backgroundColor: primary,
//       alignItems: 'center',
//       justifyContent: 'center',
//         },
//     scrollView: {
//         marginHorizontal: 10,
//       },
//       text: {
//         fontSize: 22,
//         marginBottom: 10
//       },
//       title: {
//           fontSize: 38
//       },
//     });




export default Main;

