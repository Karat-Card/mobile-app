import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MainContent = () => {
  const surveys = [
    { amount: 1.90, company: 'Ipsos', duration: 2, rating: 4.0, participants: 449, color: '#55C267' },
    { amount: 25, company: 'Ipsos', duration: 2, rating: 4.0, participants: 449, color: '#DC3C33' },
    { amount: 245, company: 'Ipsos', duration: 29, rating: 4.0, participants: 449, color: '#D7A334' },
  ];

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarCard}>
        <View style={styles.progressBarLeft}>
          <Ionicons name="trophy" size={24} color="#FFB800" />
        </View>
        <View style={styles.progressBarMiddle}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '60%' }]} />
          </View>
        </View>
        <View style={styles.progressBarRight}>
          <Text style={styles.amountText}>$2.97</Text>
        </View>
      </View>

      {/* Video Ad Bonus */}
      <View style={styles.videoAdCard}>
        <View style={styles.videoAdLeft}>
          <View style={styles.playIconContainer}>
            <Ionicons name="play" size={20} color="white" />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.dollarSign}>3$</Text>
              <Text style={styles.label}>Video Ad Bonus</Text>
            </View>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet. The graphic and typographic.
            </Text>
          </View>
        </View>
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
      </View>

      {/* Surveys Section */}
      <View style={styles.surveysSection}>
        <View style={styles.surveysHeader}>
          <View style={styles.surveysLeftHeader}>
            <View style={styles.surveysIconContainer}>
              <Ionicons name="document-text" size={18} color="white" />
            </View>
            <Text style={styles.surveysTitleText}>Surveys</Text>
            <View style={styles.infoIconContainer}>
              <Ionicons name="information-circle-outline" size={16} color="#999" />
            </View>
          </View>
          <View style={styles.refreshContainer}>
            <Ionicons name="refresh" size={18} color="#7B61FF" />
          </View>
        </View>

        {/* Survey Cards - Pixel-perfect match to the image */}
        <View style={styles.surveysList}>
          {surveys.map((survey, index) => (
            <View key={index} style={styles.surveyCardContainer}>
              <View style={[styles.surveyCard, { backgroundColor: survey.color }]}>
                {/* White price box nested properly inside the card */}
                <View style={styles.priceBoxOuterContainer}>
                  <View style={styles.priceBoxContainer}>
                    <Text style={styles.priceText}>
                      ${survey.amount % 1 === 0 ? survey.amount : survey.amount.toFixed(2)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.surveyContentContainer}>
                  <View style={styles.surveyRow}>
                    <Ionicons name="business-outline" size={14} color="white" />
                    <Text style={styles.surveyRowText}>{survey.company}</Text>
                  </View>
                  
                  <View style={styles.surveyRow}>
                    <Ionicons name="time-outline" size={14} color="white" />
                    <Text style={styles.surveyRowText}>{survey.duration} Min</Text>
                  </View>
                  
                  <View style={styles.surveyRatingRow}>
                    <View style={styles.ratingGroup}>
                      <Ionicons name="star" size={14} color="white" />
                      <Text style={styles.surveyRowText}>{survey.rating.toFixed(1)}</Text>
                    </View>
                    
                    <View style={styles.divider} />
                    
                    <View style={styles.participantsGroup}>
                      <Ionicons name="people-outline" size={14} color="white" />
                      <Text style={styles.surveyRowText}>{survey.participants}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.shareButtonContainer}>
                  <View style={styles.shareButton}>
                    <Ionicons name="share-outline" size={18} color="black" />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  // Progress Bar Styles
  progressBarCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressBarLeft: {
    marginRight: 12,
    justifyContent: 'center',
  },
  progressBarMiddle: {
    flex: 1,
    justifyContent: 'center',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E8E8ED',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5BDE9B',
    borderRadius: 6,
  },
  progressBarRight: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  amountText: {
    color: '#FF9500',
    fontWeight: '700',
    fontSize: 18,
  },
  // Video Ad Bonus Styles
  videoAdCard: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  videoAdLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  playIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dollarSign: {
    color: '#7B61FF',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  description: {
    color: '#666',
    fontSize: 14,
  },
  chevronContainer: {
    marginLeft: 8,
  },
  // Surveys Section Styles
  surveysSection: {
    marginVertical: 12,
  },
  surveysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  surveysLeftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surveysIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  surveysTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  infoIconContainer: {
    marginLeft: 6,
    justifyContent: 'center',
  },
  refreshContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveysList: {
    gap: 12,
  },
  // Pixel-perfect Survey Card Styles
  surveyCardContainer: {
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    backgroundImage: 'linear-gradient(90deg, #5BDE9B, #38B774)',
  },
  surveyCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    height: 110,  // Fixed height to match design
  },
  // Price box styling - precisely positioned
  priceBoxOuterContainer: {
    paddingLeft: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  priceBoxContainer: {
    width: 100,
    height: 86,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  // Content container styling
  surveyContentContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  surveyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  surveyRowText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 6,
    fontSize: 14,
  },
  surveyRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 12,
  },
  participantsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Share button styling
  shareButtonContainer: {
    position: 'absolute',
    top: -4,
    right: -5,
    zIndex: 10,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MainContent;