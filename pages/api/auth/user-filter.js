import nextConnect from 'next-connect'
import User from '@/database/model/User'
import faker from 'faker'
import db from '@/database/connection'
import {
  institutes,
  districts,
  cities,
  names,
  professions,
  marriageStatus,
  averageMonthlyIncomes,
  datesOfBirth,
  upazillas,
  skinColors,
  bodyTypes,
  sessions,
  heights
} from './data'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    let {
      name,
      gender,
      maritalStatus,
      city,
      district,
      upazilla,
      educationType,
      education,
      profession,
      skinColor,
      bodyType,
      bornAtFrom,
      bornAtTo,
      page,
      limit = 10,
      feetFrom,
      inchesFrom,
      feetTo,
      inchesTo,
      // Add more filters as needed
      professions,
      maritalStatuses,
      educationTypes,
      universityNames,
      educationalStatuses,
      categories
    } = req.query

    const filters = {
      active: true
    }
    if (name && name !== 'All') filters.name = { $regex: new RegExp(name, 'i') }
    if (gender && gender !== 'All') filters.gender = gender
    if (maritalStatus && maritalStatus !== 'All')
      filters.maritalStatus = maritalStatus
    if (city && city !== 'All') filters.city = city
    if (district && district !== 'All') filters.district = district
    if (upazilla && upazilla !== 'All') filters.upazilla = upazilla
    if (educationType && educationType !== 'All')
      filters.educationType = educationType
    if (education && education !== 'All') filters.education = education
    // if (profession && profession !== "All") filters.profession = profession;
    if (skinColor && skinColor !== 'All') filters.skinColor = skinColor

    if (bodyType && bodyType !== 'All') filters.bodyType = bodyType
    if (bornAtFrom && bornAtTo && bornAtFrom !== 'All' && bornAtTo !== 'All') {
      filters.bornAt = {
        $gte: new Date(bornAtFrom),
        $lte: new Date(bornAtTo)
      }
    }

    if (feetFrom && inchesFrom && feetTo && inchesTo) {
      filters.height = {
        $gte: parseInt(feetFrom) * 12 + parseInt(inchesFrom),
        $lte: parseInt(feetTo) * 12 + parseInt(inchesTo)
      }
    }

    if (professions && professions !== 'All')
      filters.profession = { $in: professions.split(',') }

    if (maritalStatuses && maritalStatuses !== 'All')
      filters.maritalStatus = { $in: maritalStatuses.split(',') }

    if (educationTypes && educationTypes !== 'All')
      filters.educationType = { $in: educationTypes.split(',') }

    if (universityNames && universityNames !== 'All')
      filters.institute = { $in: universityNames.split(',') }
    console.log({ filters })

    if (educationalStatuses && educationalStatuses !== 'All')
      filters.education = { $in: educationalStatuses.split(',') }

    if (categories && categories !== 'All')
      filters.categories = { $in: categories.split(',') }

    await db.connect()
    page = page || 1
    const skip = (page - 1) * limit
    const totalUsers = await User.countDocuments(filters)
    const totalPages = Math.ceil(totalUsers / limit)

    const users = await User.find(
      // Object.keys(filters).length > 0 ? filters : {}
      filters,
      {
        password: 0,
        email: 0,
        categories: 0,
        proposalAccepted: 0,
        proposalRecieved: 0,
        name: 0
      }
    )
      .skip(skip)
      .limit(parseInt(limit))
      .exec()
    return res
      .status(200)
      .json({ users, totalPages, totalUsers, currentPage: page })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default handler
