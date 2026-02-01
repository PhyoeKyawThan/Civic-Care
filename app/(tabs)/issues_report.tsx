import { Header } from '@/components/header';
import IssueSampleFormat from '@/components/models/issue-sample-format';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useIssueType } from '@/services/issue_types';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

function IssueReportScreen() {
  const { issueTypes, getIssues } = useIssueType();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    location_latitude: '',
    location_longitude: '',
    issue_type_id: 1,
  });
  const [issueSample, setIssueSample] = useState({
    issueType: 'တင်ပြချက် အမျိူးအစား ရွေးမချယ်ရသေးပါ။',
    sampleFormatText: '',
    visible: false,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const insets = useSafeAreaInsets();

  const theme = Colors.light;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header headerTitle='Report Issues' />
      <ScrollView style={{ backgroundColor: theme.background }}>
        <View style={[styles.formContainer, {
          marginBottom: 120 + insets.bottom
        }]}>
          <Text style={[styles.title, { color: theme.text }]}>Report an Issue</Text>

          {/* Issue Type */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>တင်ပြချက် အမျိူးအစား</Text>
            <View style={[styles.pickerContainer, {
              backgroundColor: theme.activeIcon,
              borderColor: theme.inActiveIcon,
              shadowColor: theme.shadow
            }]}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.modalContainer}
                itemTextStyle={styles.itemText}
                activeColor="#e8f5e9"
                data={issueTypes.map((issue)=>({
                  label: issue.name,
                  value: issue.id,
                  sample_form: issue.sample_form
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="တင်ပြချက် အမျိူးအစား ရွေးရန်နှိပ်ပါ"
                value=''
                onChange={item => {
                  setFormData({ ...formData, issue_type_id: item.value });
                  setIssueSample({...issueSample, issueType: item.label, sampleFormatText: item.sample_form})
                }}
              />
            </View>
          </View>

          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>အကြောင်းအရာ</Text>
            <TextInput
              placeholder="ဥပမာ: လူနေမှုပတ်ဝန်းကျင် နှောက်ယှက်မှူ တိုင်ကြားလွှာ"
              placeholderTextColor={theme.icon}
              style={[styles.input, {
                backgroundColor: theme.activeIcon,
                borderColor: theme.inActiveIcon,
                color: theme.text
              }]}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={[styles.label, { color: theme.text }]}>တင်ပြချက်</Text>
              <TouchableOpacity style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 7
              }} onPress={() => setIssueSample((prev) => ({...prev, visible: true}))}>
                <Text style={{
                  fontSize: 10
                }}>
                တင်ပြချက််ဥပမာ ကြည့်ရန်
                </Text>
                <IconSymbol name='info.bubble.fill' color='blue' />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, styles.textarea, {
                backgroundColor: theme.activeIcon,
                borderColor: theme.inActiveIcon,
                color: theme.text
              }]} 
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="တင်ပြချက်..."
              placeholderTextColor={theme.icon}
              multiline
            />
          </View>

          {/* Location Section */}
          <View style={[styles.locationSection, {
            backgroundColor: theme.tabBarBackgroundColor + '10',
            borderColor: theme.inActiveIcon
          }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>ဖြစ်ပွားစဥ် နေရာ</Text>
            <View style={styles.coordinateRow}>
              <View style={styles.coordinateInput}>
                <Text style={[styles.label, { color: theme.text }]}>Latitude</Text>
                <TextInput
                  style={[styles.input, {
                    backgroundColor: theme.activeIcon,
                    borderColor: theme.inActiveIcon,
                    color: theme.text
                  }]}
                  value={formData.location_latitude}
                  onChangeText={(text) => setFormData({ ...formData, location_latitude: text })}
                  placeholder="0.0000"
                  placeholderTextColor={theme.icon}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.coordinateInput}>
                <Text style={[styles.label, { color: theme.text }]}>Longitude</Text>
                <TextInput
                  style={[styles.input, {
                    backgroundColor: theme.activeIcon,
                    borderColor: theme.inActiveIcon,
                    color: theme.text
                  }]}
                  value={formData.location_longitude}
                  onChangeText={(text) => setFormData({ ...formData, location_longitude: text })}
                  placeholder="0.0000"
                  placeholderTextColor={theme.icon}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={[styles.submitButton, {
            backgroundColor: theme.tabBarBackgroundColor,
            shadowColor: theme.shadow
          }]}>
            <Text style={[styles.submitButtonText, { color: theme.activeIcon }]}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* issue sample */}
      <IssueSampleFormat
        issue_sample={issueSample}
        onClose={() =>
          setIssueSample((prev) => ({ ...prev, visible: false }))
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 12
  },
  textarea: {
    height: 400,
    textAlignVertical: 'top'
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  locationSection: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  coordinateInput: {
    flex: 1
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#93e28e',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#687076',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#11181C',
  },
  modalContainer: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginTop: 4,

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  itemText: {
    fontSize: 16,
    color: '#11181C',
  },
});

export default IssueReportScreen;