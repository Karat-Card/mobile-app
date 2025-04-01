import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CheckInsSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark" size={18} color="white" />
          </View>
          <Text style={styles.titleText}>Check Ins</Text>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-circle-outline" size={16} color="#999" />
          </View>
        </View>
        <View style={styles.rightHeader}>
          <Text style={styles.viewAllText}>View All</Text>
        </View>
      </View>
      
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>
          No Check Ins nearby Check Ins can be claimed in popular food and shopping areas
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  infoIconContainer: {
    marginLeft: 6,
    justifyContent: 'center',
  },
  rightHeader: {},
  viewAllText: {
    color: '#666',
    fontSize: 14,
  },
  emptyStateContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CheckInsSection;