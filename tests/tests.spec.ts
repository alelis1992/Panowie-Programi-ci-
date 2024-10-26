import { test, expect } from '@playwright/test';

test('should display all required fields', async ({ page }) => {
  // Załaduj stronę
  await page.goto('http://localhost:8080/');

  // Sprawdzenie, czy pole imię jest widoczne
  await expect(page.getByLabel('Imię')).toBeVisible();

  // Sprawdzenie, czy pole nazwisko jest widoczne
  await expect(page.getByLabel('Nazwisko')).toBeVisible();

  // Sprawdzenie, czy pole e-mail jest widoczne
  await expect(page.getByLabel('e-mail')).toBeVisible();

  // Sprawdzenie, czy pole hasło jest widoczne
  await expect(page.getByPlaceholder('Hasło', { exact: true })).toBeVisible();

  // Sprawdzenie, czy pole powtórzenia hasła jest widoczne
  await expect(page.getByLabel('Powtórz hasło')).toBeVisible();

  // Sprawdzenie, czy pole data urodzenia jest widoczne
  await expect(page.getByLabel('Data urodzenia')).toBeVisible();

  // Sprawdzenie, czy pole wyboru języka jest widoczne
  await expect(page.getByLabel('Wybierz język')).toBeVisible();

  // Sprawdzenie, czy pole numer telefonu jest widoczne
  await expect(page.getByPlaceholder('Numer telefonu')).toBeVisible();

  // Sprawdzenie, czy checkbox regulaminu jest widoczny
  await expect(page.getByLabel('Akceptuję regulamin oraz')).toBeVisible();
  await expect(page.getByLabel('Wyrażam zgodę na otrzymywanie')).toBeVisible();

  // Sprawdzenie, czy przycisk "ZAREJESTRUJ" jest widoczny
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test('should register with valid data', async ({ page }) => {
    // Załaduj stronę
    await page.goto('http://localhost:8080/');

    await page.getByPlaceholder('Imię').click();
    await page.getByPlaceholder('Imię').fill('Imie');
    await page.getByPlaceholder('Nazwisko').click();
    await page.getByPlaceholder('Nazwisko').fill('Nazwisko');
    await page.getByPlaceholder('Twój adres e-mail').click();
    await page.getByPlaceholder('Twój adres e-mail').fill('Mail@mail.com');
    await page.getByPlaceholder('Hasło', { exact: true }).click();
    await page.getByPlaceholder('Hasło', { exact: true }).fill('ZAQ!1qaz');
    await page.getByPlaceholder('Powtórz hasło').click();
    await page.getByPlaceholder('Powtórz hasło').fill('ZAQ!1qaz');
    await page.getByPlaceholder('Data urodzenia').click();
    await page.getByPlaceholder('Data urodzenia').fill('17/12/1992');
    await page.getByLabel('JęzykWybierz język afar').click();
    await page.getByPlaceholder('Data urodzenia').click();
    await page.getByText('25', { exact: true }).click();
    await page.getByLabel('JęzykWybierz język afar').selectOption('pl');
    await page.getByPlaceholder('Numer telefonu').click();
    await page.getByPlaceholder('Numer telefonu').fill('505614526');
    await page.locator('form div').filter({ hasText: 'Akceptuję regulamin oraz' }).locator('div').click();
    await page.locator('form div').filter({ hasText: 'Wyrażam zgodę na otrzymywanie' }).locator('div').click();
    await page.getByRole('button', { name: 'Zarejestruj' }).click();
  });
  
  test('should show validation errors if required fields are missing', async ({ page }) => {
    // Załaduj stronę
    await page.goto('http://localhost:8080/');  
    // Zostaw formularz pusty i spróbuj go przesłać
    await page.click('button[type="submit"]');
  
    // Sprawdź, czy pojawiły się błędy dla pól wymaganych
    await expect(page.getByText('Pole Imię jest wymagane')).toBeVisible();
    await expect(page.getByText('Pole Nazwisko jest wymagane')).toBeVisible();
    await expect(page.getByText('Pole E-mail jest wymagane')).toBeVisible();
    await expect(page.getByText('Pole password jest wymagane')).toBeVisible();
    await expect(page.getByText('Pole Powtórz hasło jest wymagane')).toBeVisible();
    await expect(page.getByText('Pole Data urodzenia jest wymagane')).toBeVisible();
    await expect(page.getByText('To pole jest wymagane')).toBeVisible();
  });
  
  test('should show error if passwords do not match', async ({ page }) => {
    // Załaduj stronę
    await page.goto('http://localhost:8080/');  
  
    // Wypełnij formularz, ale wprowadź niezgodne hasła
    await page.getByPlaceholder('Imię').click();
    await page.getByPlaceholder('Imię').fill('Imie');
    await page.getByPlaceholder('Nazwisko').click();
    await page.getByPlaceholder('Nazwisko').fill('Nazwisko');
    await page.getByPlaceholder('Twój adres e-mail').click();
    await page.getByPlaceholder('Twój adres e-mail').fill('Mail@mail.com');
    await page.getByPlaceholder('Hasło', { exact: true }).click();
    await page.getByPlaceholder('Hasło', { exact: true }).fill('ZAQ!1qaz');
    await page.getByPlaceholder('Powtórz hasło').click();
    await page.getByPlaceholder('Powtórz hasło').fill('asd');
  
    // Sprawdź, czy pojawił się błąd dotyczący niezgodnych haseł
    await expect(page.getByText('Hasła nie są jednakowe!')).toBeVisible();

  });
  