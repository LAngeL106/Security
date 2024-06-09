const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');//отображение
const swaggerJsdoc = require('swagger-jsdoc');//"каркас" для документации

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const swaggerOptions = require('./swaggerOptions');//беру контекст
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let phonebook = [
  {
    id: 1,
    username: 'Alya',
    phone: '+375293977855',
  },
  {
    id: 2,
    username: 'Antoshka',
    phone: '+375294506622',
  },
];

//нотация
/**
 * @swagger
 * /TS:
 *   get:
 *     summary: Получить список контактов
 *     description: Возвращает список всех контактов из телефонного справочника.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает список контактов.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PhonebookEntry'
 */

app.get('/TS', (req, res) => {
  res.json(phonebook);
});

/**
 * @swagger
 * /TS:
 *   post:
 *     summary: Добавить новый контакт
 *     description: Добавляет новый контакт в телефонный справочник.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhonebookEntry'
 *     responses:
 *       201:
 *         description: Успешно создан новый контакт.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhonebookEntry'
 */
app.post('/TS', (req, res) => {
  const newEntry = req.body;
  phonebook.push(newEntry);
  res.status(201).json(newEntry);
});

/**
 * @swagger
 * /TS/{id}:
 *   put:
 *     summary: Обновить контакт
 *     description: Обновляет информацию о контакте в телефонном справочнике.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID контакта для обновления
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhonebookEntry'
 *     responses:
 *       200:
 *         description: Успешно обновлена информация о контакте.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhonebookEntry'
 *       404:
 *         description: Контакт не найден.
 */
app.put('/TS/:id', (req, res) => {
  const entryId = parseInt(req.params.id);
  const updatedEntry = req.body;
  const entryIndex = phonebook.findIndex((entry) => entry.id === entryId);

  if (entryIndex !== -1) {
    phonebook[entryIndex] = { ...phonebook[entryIndex], ...updatedEntry };
    res.status(200).json(phonebook[entryIndex]);
  } else {
    res.status(404).json({ error: 'Запись не найдена' });
  }
});

/**
 * @swagger
 * /TS/{id}:
 *   delete:
 *     summary: Удалить контакт
 *     description: Удаляет контакт из телефонного справочника.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID контакта для удаления
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешно удален контакт.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhonebookEntry'
 *       404:
 *         description: Контакт не найден.
 */
app.delete('/TS/:id', (req, res) => {
  const entryId = parseInt(req.params.id);
  const entryIndex = phonebook.findIndex((entry) => entry.id === entryId);

  if (entryIndex !== -1) {
    const deletedEntry = phonebook.splice(entryIndex, 1)[0];
    res.status(200).json(deletedEntry);
  } else {
    res.status(404).json({ error: 'Запись не найдена' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
