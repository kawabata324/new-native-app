import { SafeAreaView, StyleSheet, Text } from "react-native"
import { WebView } from "react-native-webview"
import { ClipButton } from "../src/components/ClipButton"
import { useDispatch, useSelector } from "react-redux"
import { addClip, deleteClip } from "../src/store/userSlice"

export const ArticleScreen = ({ route }) => {
  const { article } = route.params
  const dispatch = useDispatch()
  const clips = useSelector((state) => state.user.clips)

  const isClipped = clips.some((clip) => clip.url === article.url)

  const onPressClip = () => {
    if (isClipped) {
      dispatch(deleteClip(article))
    } else {
      dispatch(addClip(article))
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={onPressClip} enabled={isClipped} />
      <WebView style={styles.container} source={{ uri: article.url }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
})
