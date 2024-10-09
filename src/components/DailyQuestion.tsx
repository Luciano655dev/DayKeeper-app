import { useState, useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"
import axios from "axios"

export default function DailyQuestion() {
  const [question, setQuestion] = useState("...")

  const getQuestion = async () => {
    try {
      const response: any = await axios.get("/question/")

      setQuestion(
        `${response?.data?.question.data} - ${response?.data?.question.day}`
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.author}>{question}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: 100,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  author: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
})
