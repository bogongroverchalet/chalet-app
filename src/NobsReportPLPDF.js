import React from 'react'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import openSans from 'npm-font-open-sans/fonts/Regular/OpenSans-Regular.ttf'
import openSansBold from 'npm-font-open-sans/fonts/Bold/OpenSans-Bold.ttf'

Font.register({ family: 'Open Sans', fonts: [{ src: openSans }, { src: openSansBold, fontWeight: 'bold' }] })

const s = StyleSheet.create({
  page: { fontFamily: 'Open Sans', fontSize: 11, padding: '15mm 20mm' },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16, gap: 16 },
  logo: { width: 72, height: 72 },
  version: { fontSize: 8, marginBottom: 4 },
  title: { fontSize: 28, fontWeight: 'bold', lineHeight: 1.15 },
  metaRow: { flexDirection: 'row', gap: 40, marginBottom: 6 },
  nameRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
    marginBottom: 16,
  },
  bold: { fontWeight: 'bold' },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 3 },
  hint: { fontSize: 8, marginBottom: 6 },
  contentBox: { marginBottom: 16 },
})

export function PLDocument({ week, year, name, winterPartyReport, leadershipTeam, logoUrl }) {
  return (
    <Document>
      <Page size='A4' style={s.page}>
        <View style={s.header}>
          <Image src={logoUrl} style={s.logo} />
          <View>
            <Text style={s.version}>2026 version</Text>
            <Text style={s.title}>Party Leader{'\n'}Report</Text>
          </View>
        </View>

        <View style={s.metaRow}>
          <Text>
            <Text style={s.bold}>Week: </Text>
            {week}
          </Text>
          <Text>
            <Text style={s.bold}>Year: </Text>
            {year}
          </Text>
        </View>
        <View style={s.nameRow}>
          <Text style={s.bold}>Name of Party Leader:{'  '}</Text>
          <Text>{name}</Text>
        </View>

        <View style={s.sectionTitle}>
          <Text>Winter Party Report</Text>
        </View>
        <Text style={s.hint}>
          (Weather, significant events, rescues, injuries, safety concerns, participant concerns, illness, incidents of
          note. Major issues requiring BCMG discussion)
        </Text>
        <View style={s.contentBox}>
          <Text>{winterPartyReport}</Text>
        </View>

        <View style={s.sectionTitle}>
          <Text>Leadership Team</Text>
        </View>
        <Text style={s.hint}>
          (Critically reflect on the performance of the Nobs, their suitability to perform the role again, other
          potential Nobs from the Winter Party. If necessary, report directly to Wardens)
        </Text>
        <View style={s.contentBox}>
          <Text>{leadershipTeam}</Text>
        </View>
      </Page>
    </Document>
  )
}
