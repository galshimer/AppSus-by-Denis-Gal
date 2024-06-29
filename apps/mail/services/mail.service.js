// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

var USER_IDENTIFIERS = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const email = {
    id: 'e101',
    createdAt: 1551133930500,
    subject: 'Miss you!',
    body: 'Would love to catch up sometime',
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}


const MAIL_KEY = 'mailDB'
generateDemoMails(40)

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getFilterFromSearchParams,
    generateDemoMails
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i');
                mails = mails.filter(mail =>
                    regExp.test(mail.subject) || regExp.test(mail.body)
                )
            }
            if (filterBy.folder === 'inbox') {
                console.log(mails)
                mails = mails.filter(mail => 
                    mail.from !== USER_IDENTIFIERS.email
                )
            }
            if (filterBy.folder === 'sent') {
                mails = mails.filter(mail => 
                    mail.from === USER_IDENTIFIERS.email
                )
            }
            if (filterBy.folder === 'starred') {
                mails = mails.filter(mail => 
                    mail.isStarred
                )
            }
            return mails
        })
}




function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}

function getFilterFromSearchParams(searchParams) {
    // return Object.fromEntries(searchParams)
    const txt = searchParams.get('txt') || ''
    const minSpeed = searchParams.get('minSpeed') || ''
    return {
        txt,
        minSpeed
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}



// +-+-+-+-+-+-+-+-+-+-+-+- demo data +-+-+-+-+-+-+-+-+-+-+-+-//
function generateDemoMails(mailCount = 400) {

    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!(!mails || !mails.length)) return

    let curIdNum = 0
    mails = []

    // Incoming emails
    for (let i = 0; i < mailCount * 0.75; ++i) {
        mails.push(_generateUserRandomEmail(`e${curIdNum++}`))
    }

    // outgoing emails
    for (let i = 0; i < mailCount * 0.25; ++i) {
        mails.push(_generateUserRandomEmail(`e${curIdNum++}`, true))
    }

    mails.sort((m1, m2) => m2.sentAt - m1.sentAt)

    storageService.saveToStorage(MAIL_KEY, mails)
}

// function _generateUserRandomEmail(id, userEmails = false) {
//     const twoYears = 60 * 60 * 24 * 365 * 2 * 1000
//     const onWeek = 60 * 60 * 24 * 7 * 1000
//     const today = Date.now()
//     const sentAt = utilService.getRandomIntInclusive(today - twoYears, today)
//     return {
//         id,
//         createdAt: utilService.getRandomIntInclusive(sentAt - onWeek, sentAt),
//         subject: _generateRandomEmailSubject(),
//         body: _generateRandomEmailBody(),
//         isRead: userEmails ? true : Math.random() > 0.4 ? true : false,
//         sentAt,
//         removedAt: Math.random() > 0.7 ? null : utilService.getRandomIntInclusive(sentAt, today),
//         from: userEmails ? USER_IDENTIFIERS.email : _generateRandomEmailAddress(),
//         to: _generateRandomEmailAddress(),
//     }
// }

function _generateUserRandomEmail(id, userEmails = false) {
    const twoYears = 60 * 60 * 24 * 365 * 2 * 1000;
    const oneWeek = 60 * 60 * 24 * 7 * 1000;
    const today = Date.now();
    const sentAt = utilService.getRandomIntInclusive(today - twoYears, today);
    const isRead = userEmails ? true : Math.random() > 0.4;
    const isStarred = false


    return {
        id,
        createdAt: utilService.getRandomIntInclusive(sentAt - oneWeek, sentAt),
        subject: _generateRandomEmailSubject(),
        body: _generateRandomEmailBody(),
        isRead,
        isStarred,
        sentAt,
        removedAt: Math.random() > 0.7 ? null : utilService.getRandomIntInclusive(sentAt, today),
        from: userEmails ? USER_IDENTIFIERS.email : _generateRandomEmailAddress(),
        to: _generateRandomEmailAddress(),

    };
}



function _generateRandomEmailSubject() {
    const adjectives = ['Important', 'Urgent', 'New', 'Updated', 'Final', 'Weekly', 'Monthly'];
    const nouns = ['Project', 'Meeting', 'Update', 'Report', 'Reminder', 'Schedule', 'Agenda'];
    const phrases = ['for Review', 'Regarding Your Request', 'Action Required', 'Details Inside', 'Follow-Up Needed', 'for Approval', 'FYI'];

    // Helper function to get a random element from an array
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Generate a random subject
    const subject = `${getRandomElement(adjectives)} ${getRandomElement(nouns)} ${getRandomElement(phrases)}`;
    return subject;
}

function _generateRandomEmailBody() {
    const subjects = ['The project', 'Your request', 'Our meeting', 'The document', 'Your feedback', 'The team', 'Your appointment'];
    const verbs = ['has been approved', 'was discussed', 'needs attention', 'has been completed', 'is pending', 'requires review', 'has been rescheduled'];
    const objects = ['as soon as possible', 'at your earliest convenience', 'by the end of the day', 'before the deadline', 'for the next meeting', 'with the client', 'for further discussion'];

    // Helper function to get a random element from an array
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Generate a random sentence
    const sentence = `${getRandomElement(subjects)} ${getRandomElement(verbs)} ${getRandomElement(objects)}.`;

    return sentence;
}

function _generateRandomEmailAddress() {
    const domains = ['example.com', 'test.com', 'demo.com', 'email.com', 'mail.com'];
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let email = '';

    // Generate the username part of the email (5 to 10 characters long)
    const usernameLength = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < usernameLength; i++) {
        email += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Add the '@' symbol
    email += '@';

    // Choose a random domain from the list
    email += domains[Math.floor(Math.random() * domains.length)];
    return email;
}