import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {View, SafeAreaView, StyleSheet, Text, FlatList} from 'react-native';

function Home(): React.JSX.Element {
  const {data} = useQuery({
    queryKey: ['todos-list'],
    queryFn: async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );
      return response.json();
    },
  });

  const renderSeparator = () => {
    return <View style={styles.sepView} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Showing List of Todos below</Text>
      </View>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoItemText}>{item.title}</Text>
            </View>
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      ) : (
        <View>
          <Text>Loading data...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c8b6ff',
  },
  sepView: {
    height: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  todoItem: {
    padding: 12,
  },
  todoItemText: {
    textTransform: 'capitalize',
  },
});
