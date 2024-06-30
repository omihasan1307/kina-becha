import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const result = await OrderServices.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: 'Order is Created Succssfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: 'Orders are retrived successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something is wromg',
      error: error,
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const result = await OrderServices.getSingleOrderFromDB(email);
    res.status(200).json({
      success: true,
      message: 'Orders are retrived successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something is wromg',
      error: error,
    });
  }
};

export const OrderController = { createOrder, getAllOrders, getSingleOrder };
