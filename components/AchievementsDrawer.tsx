import React, { useRef, useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

interface AchievementCardProps {
  title: string;
  icon: React.ReactNode;
  completed: number;
  total: number;
  points: number;
  color: string;
  isCompleted: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  icon,
  completed,
  total,
  points,
  color,
  isCompleted
}) => {
  const progressWidth = (completed / total) * 100;

  
  return (
    <View style={styles.achievementCard}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { backgroundColor: color, width: `${progressWidth}%` }
          ]}
        />
      </View>
      <Text style={styles.progressText}>{completed}/{total} surveys completed</Text>
      <View style={[styles.pointsContainer, { backgroundColor: isCompleted ? color : '#e6e6e6' }]}>
        <Text style={[styles.pointsText, { color: isCompleted ? 'white' : '#909090' }]}>{points} Points</Text>
      </View>
    </View>
  );
};

interface AchievementsDrawerProps {
  visible: boolean;
  onClose: () => void;
  points: number;
}

const AchievementsDrawer: React.FC<AchievementsDrawerProps> = ({ visible, onClose, points }) => {
  const slideAnim = useRef(new Animated.Value(windowHeight)).current;
  

const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnim.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 100) {
        onClose();
      } else {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  })
).current;


useEffect(() => {
  if (visible) {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(slideAnim, {
      toValue: windowHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
}, [visible]);


  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.modalOverlay}>
        <Animated.View 
                style={[
                  styles.drawerContainer,
                  { transform: [{ translateY: slideAnim }] }
                ]}
                {...panResponder.panHandlers}
        >

          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Achievements</Text>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="list" size={24} color="#7454e9" />
              <Text style={styles.sectionTitle}>Surveys</Text>
              <Ionicons name="information-circle-outline" size={24} color="#cccccc" />
            </View>
            
            <View style={styles.cardsContainer}>
              <AchievementCard
                title="Questionnaire"
                icon={<View style={[styles.trophyIcon, { backgroundColor: '#7454e9' }]}>
                  <Ionicons name="star" size={20} color="white" />
                </View>}
                completed={3}
                total={3}
                points={20}
                color="#7454e9"
                isCompleted={true}
              />
              
              <AchievementCard
                title="Questionnaire"
                icon={<View style={styles.documentIcon}>
                  <Ionicons name="document-text" size={20} color="#4cd964" />
                </View>}
                completed={2}
                total={3}
                points={20}
                color="#4cd964"
                isCompleted={false}
              />
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="videocam" size={24} color="#7454e9" />
              <Text style={styles.sectionTitle}>Video Bonus</Text>
              <Ionicons name="information-circle-outline" size={24} color="#cccccc" />
            </View>
            
            <View style={styles.cardsContainer}>
              <AchievementCard
                title="First Video"
                icon={<View style={styles.badgeIcon}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>}
                completed={2}
                total={3}
                points={20}
                color="#ffb340"
                isCompleted={false}
              />
              
              <AchievementCard
                title="Questionnaire"
                icon={<View style={[styles.trophyIcon, { backgroundColor: '#ff5a5a' }]}>
                  <Ionicons name="star" size={20} color="white" />
                </View>}
                completed={2}
                total={3}
                points={20}
                color="#ff5a5a"
                isCompleted={false}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  drawerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    height: '90%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 'auto',
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  achievementCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 10,
    width: '45%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
  },
  trophyIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  badgeIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#ffb340',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#e6e6e6',
    borderRadius: 3,
    width: '100%',
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 10,
  },
  pointsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  pointsText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AchievementsDrawer;
