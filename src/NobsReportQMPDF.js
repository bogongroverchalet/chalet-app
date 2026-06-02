import React from 'react'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import openSans from 'npm-font-open-sans/fonts/Regular/OpenSans-Regular.ttf'
import openSansBold from 'npm-font-open-sans/fonts/Bold/OpenSans-Bold.ttf'

Font.register({ family: 'Open Sans', fonts: [{ src: openSans }, { src: openSansBold, fontWeight: 'bold' }] })

const MEAT_ITEMS = [
  { key: 'chicken', butcherLabel: 'Breast Fillet', label: 'Chicken', unit: 'kg' },
  { key: 'roastBeef', butcherLabel: 'Topside', label: 'Roast Beef', unit: 'kg' },
  { key: 'roastLamb', butcherLabel: 'Boneless lamb leg', label: 'Roast Lamb', unit: 'kg' },
  { key: 'bacon', butcherLabel: 'Bertocchi Long Rindless Bacon', label: 'Bacon', unit: 'kg' },
  { key: 'stewingSteak', butcherLabel: 'Braising Steak / Chuck', label: 'Stewing Steak', unit: 'kg' },
  { key: 'sausages', butcherLabel: 'Traditional Thin Beef Sausages', label: 'Sausages', unit: 'kg' },
  { key: 'salami', butcherLabel: 'Mild Sopressa', label: 'Salami', unit: 'kg' },
  { key: 'ham', butcherLabel: 'House Smoked Ham', label: 'Ham', unit: 'kg' },
  { key: 'steak', butcherLabel: 'Rump Steak', label: 'Steak', unit: 'kg' },
  { key: 'tofu', butcherLabel: 'Tofu', label: 'Tofu', unit: 'pkts' },
]

const MENU_DAYS = [
  { key: 'saturday', day: 'Saturday', suggested: 'Green Curry with chicken / tofu' },
  { key: 'sunday', day: 'Sunday', suggested: 'Roast Beef & Roast Veg / Ratatouille' },
  { key: 'monday', day: 'Monday', suggested: 'Pasta Bake' },
  { key: 'tuesday', day: 'Tuesday', suggested: 'Beef casserole / Bean stew' },
  { key: 'wednesday', day: 'Wednesday', suggested: 'Stir fry w/ rice & steak / TVP Burgers' },
  { key: 'thursday', day: 'Thursday', suggested: 'Roast lamb w/ veg / Falafels' },
  { key: 'friday', day: 'Friday', suggested: 'Pasta' },
]

const STOCK_ITEMS = [
  { key: 'crushedTomatoes', label: 'Crushed tomatoes / Diced tomatoes', unit: 'Cans' },
  { key: 'tomatoPaste', label: 'Tomato paste', unit: 'Packets/Cartons' },
  { key: 'coconutMilk', label: 'Coconut milk powder', unit: 'Packets (1kg)' },
  { key: 'brownSugar', label: 'Brown sugar', unit: 'KGs' },
  { key: 'cannedLentils', label: 'Canned lentils', unit: 'Cans' },
  { key: 'cheese', label: 'Devondale Cheese', unit: 'Blocks' },
  { key: 'pastaSpirals', label: 'Pasta Spirals', unit: 'Packets' },
  { key: 'margarine', label: 'Margarine', unit: '1kg buckets' },
  { key: 'plainFlour', label: 'Plain flour', unit: 'KGs' },
  { key: 'toiletPaper', label: 'Toilet Paper', unit: 'Packets' },
  { key: 'paperTowel', label: 'Paper towel', unit: 'Full rolls' },
  { key: 'sanitiser', label: 'Sanitiser (RF-12)', unit: '5L drums/jerry' },
  { key: 'handWash', label: 'Hand wash (pink)', unit: '5L drums/jerry' },
  { key: 'dishSoap', label: 'Dish soap', unit: 'Bottles' },
  { key: 'lemonDisinfectant', label: 'Lemon disinfectant', unit: '20L drums' },
]

const HERBS = [
  { key: 'basilLeaves', label: 'Basil Leaves' },
  { key: 'bayLeaves', label: 'Bay Leaves' },
  { key: 'cajunSeasoning', label: 'Cajun Seasoning' },
  { key: 'cayanne', label: 'Cayanne' },
  { key: 'chilliPowder', label: 'Chilli powder/flakes' },
  { key: 'chives', label: 'Chives' },
  { key: 'cinnamonSugar', label: 'Cinnamon sugar' },
  { key: 'cinnamon', label: 'Cinnamon' },
  { key: 'cloves', label: 'Cloves' },
  { key: 'corianderLeaves', label: 'Coriander Leaves' },
  { key: 'corianderPowder', label: 'Coriander Powder/Ground' },
  { key: 'corianderSeeds', label: 'Coriander Seeds' },
  { key: 'crushedChilli', label: 'Crushed Chilli' },
  { key: 'cummin', label: 'Cummin' },
  { key: 'fiveSpice', label: 'Five Spice Powder (Chinese)' },
  { key: 'garlicGranulates', label: 'Garlic Granulates' },
  { key: 'garumMarsala', label: 'Garum Marsala' },
  { key: 'groundNutmeg', label: 'Ground Nutmeg' },
  { key: 'gingerPowder', label: 'Ginger Powder' },
  { key: 'italianHerbs', label: 'Italian Herbs / Mixed Herbs' },
  { key: 'lemonPepper', label: 'Lemon pepper' },
  { key: 'mixedSpice', label: 'Mixed Spice / All Spice' },
  { key: 'oregano', label: 'Oregano Leaves' },
  { key: 'paprika', label: 'Paprika / sweet' },
  { key: 'parsley', label: 'Parsley' },
  { key: 'poppySeeds', label: 'Poppy Seeds' },
  { key: 'rosemary', label: 'Rosemary Leaves' },
  { key: 'sage', label: 'Sage' },
  { key: 'sesameSeeds', label: 'Sesame Seeds' },
  { key: 'thyme', label: 'Thyme Leaves' },
  { key: 'turmeric', label: 'Turmeric' },
]

const s = StyleSheet.create({
  page: { fontFamily: 'Open Sans', fontSize: 10, padding: '12mm 16mm' },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  logo: { width: 60, height: 60 },
  version: { fontSize: 8, marginBottom: 3 },
  title: { fontSize: 22, fontWeight: 'bold', lineHeight: 1.15 },
  metaRow: { flexDirection: 'row', gap: 32, marginBottom: 5 },
  nameRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
    marginBottom: 12,
  },
  bold: { fontWeight: 'bold' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 3, marginTop: 10 },
  hint: { fontSize: 8, fontStyle: 'italic', marginBottom: 5 },
  contentBox: { marginBottom: 8 },
  tableRow: { flexDirection: 'row' },
  cell: { borderWidth: 0.5, borderColor: '#aaa', padding: '2 4', fontSize: 9 },
  cellBg: { backgroundColor: '#f0f0f0' },
})

export function QMDocument({ week, year, fields, logoUrl }) {
  const v = (key) => fields[key] ?? ''
  const outOfStockHerbs = HERBS.filter(({ key }) => fields[`herb_${key}`]).map(({ label }) => label)

  return (
    <Document>
      {/* Page 1: header, meat table, food safety */}
      <Page size='A4' style={s.page}>
        <View style={s.header}>
          <Image src={logoUrl} style={s.logo} />
          <View>
            <Text style={s.version}>2026 version</Text>
            <Text style={s.title}>Quartermaster{'\n'}Report</Text>
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
          <Text style={s.bold}>Name of Quartermaster:{'  '}</Text>
          <Text>{v('name')}</Text>
        </View>

        <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 6 }}>
          Please fill in <Text style={{ textDecoration: 'underline' }}>AT THE START OF THE WEEK</Text> when sorting the
          meat at the chalet:
        </Text>

        <View style={{ flexDirection: 'row', gap: 24, marginBottom: 8 }}>
          <Text style={{ fontSize: 9 }}>
            <Text style={s.bold}>Number of participants in party: </Text>
            {v('participantCount')}
          </Text>
          <Text style={{ fontSize: 9 }}>
            <Text style={s.bold}>Total weight of meat & tofu received: </Text>
            {v('totalMeatTofu')}
          </Text>
        </View>

        {/* Meat table */}
        <View style={s.tableRow}>
          <View style={[s.cell, s.cellBg, { width: '35%' }]}>
            <Text style={s.bold}>Butcher slip label</Text>
          </View>
          <View style={[s.cell, s.cellBg, { width: '20%' }]}>
            <Text style={s.bold}>Label</Text>
          </View>
          <View style={[s.cell, s.cellBg, { width: '35%' }]}>
            <Text style={s.bold}>Received</Text>
          </View>
          <View style={[s.cell, s.cellBg, { width: '10%' }]}>
            <Text style={s.bold}>Unit</Text>
          </View>
        </View>
        {MEAT_ITEMS.map(({ key, butcherLabel, label, unit }) => (
          <View key={key} style={s.tableRow}>
            <View style={[s.cell, { width: '35%' }]}>
              <Text>{butcherLabel}</Text>
            </View>
            <View style={[s.cell, { width: '20%' }]}>
              <Text>{label}</Text>
            </View>
            <View style={[s.cell, { width: '35%' }]}>
              <Text>{v(key)}</Text>
            </View>
            <View style={[s.cell, { width: '10%' }]}>
              <Text>{unit}</Text>
            </View>
          </View>
        ))}

        <Text style={{ fontSize: 8, fontStyle: 'italic', marginTop: 4, marginBottom: 8 }}>
          Please comment if the amount per person per meal is too much, not enough or just right.
        </Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('meatComments')}</Text>
        </View>

        <Text style={[s.sectionTitle, { marginTop: 4 }]}>Food Safety Issues</Text>
        <Text style={s.hint}>Food items destroyed, spoiled food, and food recalls. Allergy/dietary near misses.</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('foodSafety')}</Text>
        </View>
      </Page>

      {/* Page 2: bulk pantry, suggestions, menu changes */}
      <Page size='A4' style={s.page}>
        <Text style={[s.sectionTitle, { marginTop: 0 }]}>Bulk Food Pantry</Text>
        <Text style={s.hint}>Broken packaging, spills, rust, evidence of vermin, etc.</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('bulkPantry')}</Text>
        </View>

        <Text style={{ fontSize: 9, marginBottom: 4 }}>
          Please list the day/s that the dehumidifier penguins were reset:
        </Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('dehumidifierDays')}</Text>
        </View>

        <Text style={s.sectionTitle}>Suggestions</Text>
        <Text style={s.hint}>New ingredients, menu variations, etc.</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('suggestions')}</Text>
        </View>

        <Text style={s.sectionTitle}>Menu Changes</Text>
        <Text style={s.hint}>Any particularly good or bad menu items?</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('menuChanges')}</Text>
        </View>

        <Text style={{ fontSize: 8, marginBottom: 4 }}>
          Please note any menu changes. If there was a reason other than preference, please detail (e.g. Out of X; Too
          hard to manage dietaries, etc.)
        </Text>
        <View style={s.tableRow}>
          <View style={[s.cell, s.cellBg, { width: '18%' }]}>
            <Text></Text>
          </View>
          <View style={[s.cell, s.cellBg, { width: '41%' }]}>
            <Text style={s.bold}>Suggested</Text>
          </View>
          <View style={[s.cell, s.cellBg, { width: '41%' }]}>
            <Text style={s.bold}>Alternative (i.e. what you made instead)</Text>
          </View>
        </View>
        {MENU_DAYS.map(({ key, day, suggested }) => (
          <View key={key} style={s.tableRow}>
            <View style={[s.cell, { width: '18%' }]}>
              <Text style={s.bold}>{day}</Text>
            </View>
            <View style={[s.cell, { width: '41%' }]}>
              <Text>{suggested}</Text>
            </View>
            <View style={[s.cell, { width: '41%' }]}>
              <Text>{v(`alt_${key}`)}</Text>
            </View>
          </View>
        ))}
        <Text style={{ fontSize: 8, color: '#555', marginTop: 3 }}>
          (We're asking this to gauge what is being cooked every week and whether changes are needed long-term)
        </Text>
      </Page>

      {/* Page 3: excess meat, shortages, kitchen equipment, stock */}
      <Page size='A4' style={s.page}>
        <Text style={[s.sectionTitle, { marginTop: 0 }]}>Excess Meat & Vegies</Text>
        <Text style={s.hint}>
          Please list the amount of lunch meats and veggies you have left over at the end of the week, chop them up into
          smaller sizes and put them in the food scraps bin. Ensure any raw meat/fat is cooked before going in the food
          scraps bin.
        </Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('excessMeat')}</Text>
        </View>

        <Text style={s.sectionTitle}>Food Shortages</Text>
        <Text style={s.hint}>
          Please ensure that any shortages of ESSENTIAL food items that will be required to be brought in by the
          following week are brought to the attention of the Booking Officer by Wednesday night at the latest. Please
          conduct a thorough search of the Bulk Food Pantry prior to reporting any shortage.
        </Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('foodShortages')}</Text>
        </View>

        <Text style={s.sectionTitle}>Kitchen equipment breakages or shortages</Text>
        <Text style={s.hint}>Check the Wardens flat and Nobs Cupboard first, before reporting. Please list below:</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('kitchenEquipment')}</Text>
        </View>

        <Text style={s.sectionTitle}>Stock</Text>
        <Text style={{ fontSize: 8, marginBottom: 4 }}>
          Please stocktake the following ingredients & cleaning stock on{' '}
          <Text style={s.bold}>Friday night, either before or after dinner.</Text>
        </Text>
        {STOCK_ITEMS.map(({ key, label, unit }) => (
          <View key={key} style={s.tableRow}>
            <View style={[s.cell, { width: '50%' }]}>
              <Text>{label}</Text>
            </View>
            <View style={[s.cell, { width: '35%' }]}>
              <Text>{v(`stock_${key}`)}</Text>
            </View>
            <View style={[s.cell, { width: '15%' }]}>
              <Text>{unit}</Text>
            </View>
          </View>
        ))}
      </Page>

      {/* Page 4: herbs, dietary, other notes, checklist */}
      <Page size='A4' style={s.page}>
        <Text style={[s.sectionTitle, { marginTop: 0 }]}>Herbs & Spices out of stock</Text>
        <Text style={{ fontSize: 9, marginBottom: 6 }}>
          {outOfStockHerbs.length > 0 ? outOfStockHerbs.join(', ') : 'None out of stock'}
        </Text>

        <Text style={s.sectionTitle}>Dietary products used & finished</Text>
        <Text style={s.hint}>
          If you've used & finished any dietary products, please stocktake these (e.g. we've used 10kg of Gluten free
          flour; Used all vegan whipping cream).
        </Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('dietaryProducts')}</Text>
        </View>

        <Text style={s.sectionTitle}>Other Notes</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('otherNotes')}</Text>
        </View>

        <Text style={[s.sectionTitle, { marginTop: 8 }]}>Checklist</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
          <Text style={{ fontSize: 10 }}>{v('fridgeTempCompleted') ? '☑' : '☐'}</Text>
          <Text style={{ fontSize: 9 }}>
            The fridge temperature spreadsheet is filled out (Leave at the Chalet above the fridge).
          </Text>
        </View>

        <Text style={{ fontSize: 9, fontWeight: 'bold', marginTop: 16 }}>
          IMPORTANT – You are responsible for the information contained in this report. You may be required to elaborate
          upon it at length at a later date.
        </Text>
      </Page>
    </Document>
  )
}
