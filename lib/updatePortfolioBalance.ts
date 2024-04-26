import prisma from "@/lib/db";

export const updatePortfolioBalance = async (portfolioId, newBalance) => {
    try {
        await prisma.portfolio.update({
            where: { id: portfolioId },
            data: { balance: newBalance },
        });
        console.log(`Баланс портфеля з id ${portfolioId} успішно оновлено.`);
    } catch (error) {
        console.error(`Сталася помилка при оновленні балансу портфеля: ${error}`);
        throw error;
    }
};