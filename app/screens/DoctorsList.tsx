import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch doctor data from API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://4nibhbfbk5.execute-api.ap-south-1.amazonaws.com/test/listDoctor');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  interface Doctor {
    Name: string;
    Fees: number;
    Availability: string;
    docID: string;
  }

  const renderDoctorCard = ({ item }: { item: Doctor }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.Name}</Text>
      <Text style={styles.fees}>Fees: ₹{item.Fees}</Text>
      <Text style={styles.availability}>Availability: {item.Availability}</Text>
      <Text style={styles.docId}>ID: {item.docID}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading Doctors...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.docID.toString()}
        renderItem={renderDoctorCard}
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
  docId: {
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

export default DoctorsList;
