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
      categories,
      skinColors
    } = req.query

    const filters = {
      active: true
    }
    if (name && name !== 'All') {
      const safeName = String(name).slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      filters.name = { $regex: safeName, $options: 'i' }
    }
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
    if (skinColors && skinColors !== 'All') filters.skinColor = skinColor

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

    if (skinColors && skinColors !== 'All')
      filters.skinColor = { $in: skinColors.split(',') }

    if (educationTypes && educationTypes !== 'All')
      filters.educationType = { $in: educationTypes.split(',') }

    if (universityNames && universityNames !== 'All')
      filters.institute = { $in: universityNames.split(',') }

    if (educationalStatuses && educationalStatuses !== 'All')
      filters.education = { $in: educationalStatuses.split(',') }

    if (categories && categories !== 'All')
      filters.categories = { $in: categories.split(',') }

    await db.connect()
    page = Math.max(1, Number.parseInt(page, 10) || 1)
    limit = Math.min(24, Math.max(1, Number.parseInt(limit, 10) || 10))
    const skip = (page - 1) * limit

    const [totalUsers, users] = await Promise.all([
      User.countDocuments(filters),
      User.find(
      // Object.keys(filters).length > 0 ? filters : {}
      filters,
      {
        password: 0,
        salt: 0,
        email: 0,
        categories: 0,
        proposalAccepted: 0,
        proposalRecieved: 0,
        name: 0
      }
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    ])
    const totalPages = Math.ceil(totalUsers / limit)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res
      .status(200)
      .json({ users, totalPages, totalUsers, currentPage: page })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default handler
