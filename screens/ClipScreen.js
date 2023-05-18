import { SafeAreaView, StyleSheet, FlatList, Text } from "react-native"
import Constants from "expo-constants"
import { useSelector } from "react-redux"
import { ListItem } from "../src/components/ListItem"

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`

export const ClipScreen = ({ navigation }) => {
  const clips = useSelector((state) => state.user.clips)

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={clips}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.author}
            onPress={() => navigation.navigate("Article", { article: item })}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
})
