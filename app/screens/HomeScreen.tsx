import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [isReminderModalVisible, setReminderModalVisible] = useState(false);
  const [isTimeInputVisible, setTimeInputVisible] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [savedReminders, setSavedReminders] = useState<{ title: string, time: string }[]>([]);

  const handleTitleSubmit = () => {
    if (reminderTitle.trim() === '') {
      Alert.alert('Invalid Title', 'Please enter a reminder title');
      return;
    }
    setReminderModalVisible(false);
    setTimeInputVisible(true);
  };

  const handleTimeSubmit = () => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(reminderTime)) {
      Alert.alert('Invalid Time', 'Please enter time in HH:MM format (24-hour)');
      return;
    }

    setSavedReminders(prev => [...prev, { title: reminderTitle, time: reminderTime }]);
    setReminderTitle('');
    setReminderTime('');
    setTimeInputVisible(false);
  };

  const openReminderModal = () => {
    setReminderTitle('');
    setReminderTime('');
    setReminderModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, Patient</Text>

      <View style={styles.row}>
        <TouchableOpacity 
          style={styles.square} 
          onPress={() => navigation.navigate('DoctorsList')}
        >
          <Text style={styles.squareText}>Doctor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.square} 
          onPress={() => navigation.navigate('NursesList')}
        >
          <Text style={styles.squareText}>Nurse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.square}>
          <Text style={styles.squareText}>Ambulance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.square}>
          <Text style={styles.squareText}>Medicine</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.addReminderButton}
        onPress={openReminderModal}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addReminderText}>Add Reminder</Text>
      </TouchableOpacity>

      {savedReminders.map((reminder, index) => (
        <View key={index} style={styles.savedReminderContainer}>
          <Text style={styles.savedReminderText}>
            {reminder.title} - {reminder.time}
          </Text>
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isReminderModalVisible}
        onRequestClose={() => setReminderModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Reminder Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Reminder Title"
              value={reminderTitle}
              onChangeText={setReminderTitle}
            />
            
            <TouchableOpacity 
              style={styles.saveReminderButton}
              onPress={handleTitleSubmit}
            >
              <Text style={styles.saveReminderButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isTimeInputVisible}
        onRequestClose={() => {
          setTimeInputVisible(false);
          setReminderTitle('');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Reminder Time</Text>
            <TextInput
              style={styles.input}
              placeholder="Time (HH:MM)"
              value={reminderTime}
              onChangeText={(text) => {
                let formattedText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                if (formattedText.length > 2) {
                  formattedText = formattedText.slice(0, 2) + ':' + formattedText.slice(2, 4);
                }
                setReminderTime(formattedText); // Update the state
              }}
              keyboardType="numeric"
              maxLength={5} // To limit input length to HH:MM format
            />
            
            <TouchableOpacity 
              style={styles.saveReminderButton}
              onPress={handleTimeSubmit}
            >
              <Text style={styles.saveReminderButtonText}>Save Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  square: {
    width: '45%',
    height: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  squareText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addReminderButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  addReminderText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  saveReminderButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  saveReminderButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  savedReminderContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '80%',
  },
  savedReminderText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
