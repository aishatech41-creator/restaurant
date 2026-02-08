import { useEffect, useState } from "react";
import { orderService } from "../../../services/orderService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await orderService.getAll();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load orders");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: any, status: string) => {
        try {
            await orderService.updateStatus(id, status);
            toast.success("Order status updated");
            fetchOrders();
        } catch (error) {
            toast.error("Failed to update status");
        }
    }

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center p-4 bg-primary text-headingColor">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-start justify-start p-6 bg-primary text-headingColor">
            <div className="w-full flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Orders Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage and track customer orders</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="px-6 py-2.5 bg-gradient-to-tr from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            <div className="w-full overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr className="bg-orange-50 border-b border-orange-100">
                                <th className="px-6 py-4 text-orange-800 font-bold uppercase text-xs tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-orange-800 font-bold uppercase text-xs tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-orange-800 font-bold uppercase text-xs tracking-wider">Items</th>
                                <th className="px-6 py-4 text-orange-800 font-bold uppercase text-xs tracking-wider">Total</th>
                                <th className="px-6 py-4 text-orange-800 font-bold uppercase text-xs tracking-wider">Date</th>
                                <th className="px-6 py-4 text-orange-800 font-bold uppercase text-xs tracking-wider">Status</th>
                                <th className="px-6 py-4 text-orange-800 font-bold uppercase text-xs tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {orders.length > 0 ? (
                                orders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-orange-50/30 transition-colors duration-200">
                                        <td className="px-6 py-4 font-semibold text-gray-700">#{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800">{order.delivery_details?.fullname}</span>
                                                <span className="text-xs text-gray-500">{order.delivery_details?.email}</span>
                                                <span className="text-xs text-gray-400">{order.delivery_details?.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-gray-700">{order.items?.length || 0} items</span>
                                                <div className="text-xs text-gray-400 truncate max-w-[200px]">
                                                    {order.items?.map((item: any) => item.title).join(', ')}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-accent">₦{parseFloat(order.total_amount).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                                                    order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.payment_status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-red-100 text-red-800'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${order.payment_status === 'paid' ? 'bg-green-400' :
                                                        order.payment_status === 'pending' ? 'bg-yellow-400' :
                                                            order.payment_status === 'delivered' ? 'bg-blue-400' :
                                                                'bg-red-400'
                                                    }`}></span>
                                                {order.payment_status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.payment_status !== 'delivered' && (
                                                <button
                                                    onClick={() => updateStatus(order.id, 'delivered')}
                                                    className="group flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
                                                >
                                                    <span>Mark Delivered</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-16">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                            <span className="text-lg font-medium text-gray-500">No orders found</span>
                                            <p className="text-sm mt-1">Orders will appear here once customers place them.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
