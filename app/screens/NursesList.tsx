import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const NursesList = () => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch nurse data from API
    const fetchNurses = async () => {
      try {
        const response = await fetch('https://4nibhbfbk5.execute-api.ap-south-1.amazonaws.com/test/listNurse');
        const data = await response.json();
        setNurses(data);
      } catch (error) {
        console.error('Error fetching nurses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, []);

  interface Nurse {
    Name: string;
    Fees: number;
    Availability: string;
    nurseID: number;
  }

  const renderNurseCard = ({ item }: { item: Nurse }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.Name}</Text>
      <Text style={styles.fees}>Fees: ₹{item.Fees}</Text>
      <Text style={styles.availability}>Availability: {item.Availability}</Text>
      <Text style={styles.nurseId}>ID: {item.nurseID}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading Nurses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={nurses}
        keyExtractor={(item) => item.nurseID.toString()}
        renderItem={renderNurseCard}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
  },
  list: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  fees: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  availability: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  nurseId: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NursesList;
